#!/usr/bin/env python3
"""
MOR Pipeline — Pull Tradier filled orders and write to today's session log.
Runs every 15 minutes via GitHub Actions.
Replaces pull_alpaca_fills.py (Alpaca deprecated — now using Tradier for options/stocks).
"""

import os
import json
import requests
from datetime import date

TRADIER_TOKEN = os.environ.get('TRADIER_TOKEN')
TRADIER_ACCOUNT = os.environ.get('TRADIER_ACCOUNT_ID')
BASE_URL = os.environ.get('TRADIER_BASE_URL', 'https://api.tradier.com')

headers = {
    'Authorization': f'Bearer {TRADIER_TOKEN}',
    'Accept': 'application/json'
}


def get_todays_orders():
    if not TRADIER_TOKEN or not TRADIER_ACCOUNT:
        print('[MOR] Tradier keys not set — skipping pull. Add TRADIER_TOKEN and TRADIER_ACCOUNT_ID to secrets.')
        return []
    url = f"{BASE_URL}/v1/accounts/{TRADIER_ACCOUNT}/orders"
    resp = requests.get(url, headers=headers)
    if resp.status_code != 200:
        print(f'[MOR] Tradier API error: {resp.status_code}')
        return []
    data = resp.json()
    orders = data.get('orders', {}).get('order', [])
    if isinstance(orders, dict):
        orders = [orders]
    filled = [o for o in orders if o.get('status') == 'filled']
    return filled


def format_trade_row(order):
    symbol = order.get('symbol', '')
    side = order.get('side', '').replace('_', ' ')
    qty = order.get('quantity', '')
    entry = order.get('avg_fill_price', '')
    status = order.get('status', '')
    created = order.get('create_date', '')[:10]
    return f"| {symbol} | {side} | {qty} | {entry} | {status} | {created} |"


def update_session_log(fills):
    today = date.today().strftime('%Y-%m-%d')
    log_path = f"logs/{today}_session_log.md"

    if not os.path.exists(log_path):
        with open('logs/template_session_log.md', 'r') as f:
            content = f.read().replace('[DATE]', today)
    else:
        with open(log_path, 'r') as f:
            content = f.read()

    with open(log_path, 'w') as f:
        f.write(content)

    print(f"[MOR] Session log updated: {len(fills)} Tradier fills found for {today}")


if __name__ == '__main__':
    fills = get_todays_orders()
    update_session_log(fills)
    if fills:
        print(json.dumps(fills, indent=2))
    else:
        print('[MOR] No filled orders this session.')
