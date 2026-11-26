from playwright.sync_api import sync_playwright
import os
d=os.getcwd()
with sync_playwright() as p:
    b=p.chromium.launch(); pg=b.new_page(viewport={'width':900,'height':1200})
    pg.goto('file://'+d+'/banner.html'); pg.wait_for_timeout(500)
    pg.screenshot(path=d+'/shot.png')
    pg.pdf(path=d+'/base.pdf',width='900px',height='1200px',print_background=True)
    b.close()
