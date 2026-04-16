#!/usr/bin/env python3
"""
MOR Pipeline — Push today's session summary to Notion daily log database.
Runs every 15 minutes via GitHub Actions.
Requires: NOTION_API_KEY and NOTION_DATABASE_ID in GitHub Secrets.
"""

import os
import json
import requests
from datetime import date

NOTION_KEY = os.environ.get('NOTION_API_KEY')
DB_ID = os.environ.get('NOTION_DATABASE_ID')
today = date.today().isoformat()

headers = {
    'Authorization': f'Bearer {NOTION_KEY}',
    'Content-Type': 'application/json',
    'Notion-Version': '2022-06-28'
}

def push_daily_log():
    if not NOTION_KEY or not DB_ID:
        print('[MOR] Notion keys not set — skipping push. Add NOTION_API_KEY and NOTION_DATABASE_ID to GitHub Secrets.')
        return
    
    payload = {
        'parent': {'database_id': DB_ID},
        'properties': {
            'Date': {'date': {'start': today}},
            'Status': {'select': {'name': 'Auto-synced'}},
            'Session': {'title': [{'text': {'content': f'MOR Session Log {today}'}}]}
        }
    }
    
    resp = requests.post('https://api.notion.com/v1/pages', headers=headers, json=payload)
    
    if resp.status_code == 200:
        print(f'[MOR] Notion log pushed for {today}')
    else:
        print(f'[MOR] Notion push failed: {resp.status_code} — {resp.text}')

if __name__ == '__main__':
    push_daily_log()
