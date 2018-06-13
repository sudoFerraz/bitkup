import sendgrid
import os
from sendgrid.helpers.mail import *

key = os.environ.get('../../sendgrid_key')
print key
sg = sendgrid.SendGridAPIClient(apikey=key)
from_email = Email("donotreply@bitkup.com")
to_email = Email("gustavo@negalize.com")
subject = "teste"
content = Content("text/plain", "blabla blabla")
mail = Mail(from_email, subject, to_email, content)
response = sg.client.mail.send.post(request_body=mail.get())
print(response.status_code)
print(response.body)
print(response.headers)
