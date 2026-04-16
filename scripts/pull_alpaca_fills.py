#!/usr/bin/env python3
"""
MOR Pipeline — Pull Alpaca filled orders and write to today's session log.
Runs every 15 minutes via GitHub Actions.
"""

import os
import json
import requests
from datetime import date, datetime

ALPACA_KEY = os.environ.get('ALPACA_API_KEY')
ALPACA_SECRET = os.environ.get('ALPACA_SECRET_KEY')
BASE_URL = 'https://api.alpaca.markets'

headers = {
    'APCA-API-KEY-ID': ALPACA_KEY,
    'APCA-API-SECRET-KEY': ALPACA_SECRET
}

def get_todays_fills():
    today = date.today().isoformat()
    url = f"{BASE_URL}/v2/orders"
    params = {
        'status': 'closed',
        'after': f"{today}T00:00:00Z",
        'limit': 100
    }
    resp = requests.get(url, headers=headers, params=params)
    return resp.json() if resp.status_code == 200 else []

def format_trade_row(order):
    symbol = order.get('symbol', '')
    side = order.get('side', '')
    qty = order.get('filled_qty', '')
    entry = order.get('filled_avg_price', '')
    status = order.get('status', '')
    created = order.get('created_at', '')[:10]
    return f"| {symbol} | {side} | {qty} | {entry} | {status} | {created} |"

def update_session_log(fills):
    today = date.today().strftime('%Y-%m-%d')
    log_path = f"logs/{today}_session_log.md"
    
    if not os.path.exists(log_path):
        # Copy template
        with open('logs/template_session_log.md', 'r') as f:
            content = f.read().replace('[DATE]', today)
    else:
        with open(log_path, 'r') as f:
            content = f.read()
    
    trade_rows = '\n'.join([format_trade_row(o) for o in fills]) if fills else '| No fills yet | | | | | |'
    
    # Write updated log
    with open(log_path, 'w') as f:
        f.write(content)
    
    print(f"[MOR] Session log updated: {len(fills)} fills found for {today}")

if __name__ == '__main__':
    fills = get_todays_fills()
    update_session_log(fills)
    print(json.dumps(fills, indent=2))
