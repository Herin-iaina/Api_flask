# import pandas as pd
# import gspread
# from google.oauth2.service_account import Credentials
# from googleapiclient.discovery import build
# from bs4 import BeautifulSoup
# import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
from selenium.webdriver.common.by import By
import time
from parsel import Selector
from selenium.webdriver.support.ui import Select
import re

opts= Options()
driver= webdriver.Chrome(options=opts)

base="https://www.pagesdor.be"

big_result=[]
i=21
while (i<25):
    driver.get("https://www.pagesdor.be/trouvez/Cabinet+comptable/"+ str(i+1) +"/")
    sel= Selector(text=driver.page_source)
    links= sel.xpath("//ol[@class='result-items flex flex-col gap-4 ']//a[@class='absolute bottom-0 left-0 right-0 top-0 z-10']/@href").extract()
    for link in links:
        temp=[]
        driver.get(base+link)
        sel= Selector(text=driver.page_source)
        nom_entreprise= sel.xpath("//h1[@id='listing-title']//span[@class='words-break']/text()").extract_first()
        
        contact= sel.xpath("//li[@id='phoneNumber']//a[@class='filled-dark-btn hover:bg-black justify-center mt-auto']/@data-phone-number").extract()
        if contact:
            if len(contact)>1:
                true_contact= " \n ".join(contact)
                temp.append(true_contact)
            elif len(contact)==1:
                true_contact= contact[0]
            else:
                true_contact=""
        else:
            ps_contact= sel.xpath("//a[@class='border-b flex justify-between p-4']/@href").extract()
            if ps_contact:
                if len(ps_contact)>1:
                    true_contact= " \n ".join(ps_contact)
                    temp.append(true_contact)
                elif len(ps_contact)==1:
                    true_contact= ps_contact[0]
                else:
                    true_contact=""
            else:
                ps2_contact= sel.xpath("//div[@class='basis-42']//a[@id='phoneNumber']/@data-phone-number").extract()
                if len(ps2_contact)>1:
                    true_contact= " \n ".join(ps2_contact)
                    temp.append(true_contact)
                elif len(ps2_contact)==1:
                    true_contact= ps2_contact[0]
                else:
                    true_contact=""
                    
            
        
        site_web= sel.xpath("//li[@data-label='Site Web']//a[@class='outline-btn border-1']/@href").extract()
        if site_web:
            true_web= site_web[0]
        else:
            true_web=""
        
        mail= sel.xpath("//li[@data-label='Ecrire']//a[@class='outline-btn border-1']/@href").extract()
        if mail:
            regex= re.compile("[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}")
            resultat = regex.search(mail[0])
            email= resultat.group(0)
            if email:
                true_mail= email
            else:
                true_mail=""
        else:
            true_mail=""
            
        temp=[nom_entreprise, true_web, true_mail, true_contact]
        big_result.append(temp)
        
    i+=1

print(big_result)






