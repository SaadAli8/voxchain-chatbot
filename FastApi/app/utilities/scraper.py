from selenium import webdriver
from selenium.webdriver.chrome.service import Service
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager
from bs4 import BeautifulSoup
import logging

def scrape_content_with_selenium(url):
    service = Service(ChromeDriverManager().install())
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    driver = webdriver.Chrome(service=service, options=options)

    try:
        driver.get(url)
        WebDriverWait(driver, 10).until(
            EC.visibility_of_element_located((By.TAG_NAME, "body"))
        )
        soup = BeautifulSoup(driver.page_source, 'html.parser')

        headings = ' '.join([h.text.strip() for h in soup.find_all(['h1', 'h2', 'h3'])])
        paragraphs = ' '.join([p.text.strip() for p in soup.find_all('p')])
        links = ' '.join([a['href'] for a in soup.find_all('a', href=True)])
        tables = ' '.join([' '.join([td.text for td in table.find_all('td')]) for table in soup.find_all('table')])
        images = ' '.join([img['src'] for img in soup.find_all('img', src=True)])

        content = {
            "Headings": headings,
            "Paragraphs": paragraphs,
            "Links": links,
            "Tables": tables,
            "Images": images
        }
        if not any(content.values()):
            return "No content found on the page."
        return f"Headings: {headings}\nParagraphs: {paragraphs}\nLinks: {links}\nTables: {tables}\nImages: {images}"
    except Exception as e:
        logging.error(f"An error occurred: {e}")
        return "Failed to fetch the page due to a network or rendering error."
    finally:
        driver.quit()
