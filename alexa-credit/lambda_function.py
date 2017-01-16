from ask import alexa
import urllib2
import json
import smtplib
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText
from email.MIMEBase import MIMEBase
from email import encoders

fromaddr = "example@gmail.com"
password = ""
toaddr = "example@gmail.com"

msg = MIMEMultipart()
msg['From'] = fromaddr
msg['To'] = toaddr
msg['Subject'] = "Capital One Card Built"
 
body = "Welcome to Capital One!\n\nOur algorithm has analyzed all of your Capital One" \
" transactions in the past year and from this, we have built the perfect credit card plan for you." \
" Get more cash back, more rewards, and less interest based on your personal spending habits." \
" Your card is attached below!\n\nWith Love, \nWhat's in your wallet?"
msg.attach(MIMEText(body, 'plain'))

def lambda_handler(request_obj, context={}):
    return alexa.route_request(request_obj)

@alexa.default_handler()
def default_handler(request):
    return launch_request_handler(request)

@alexa.request_handler("LaunchRequest")
def launch_request_handler(request):
    return alexa.create_response(message="You are now signed into Capital One's Credit Card Builder."\
    	" Would you like to build a card?", end_session=False)

@alexa.request_handler(request_type="SessionEndedRequest")
def session_ended_request_handler(request):
    return alexa.create_response(message="Bye!", end_session=True)

@alexa.intent_handler("AMAZON.NoIntent")
def get_noaccount_nearby_handler(request):
    followMessage = "Okay, Goodbye!"
    return alexa.create_response(message=followMessage, end_session=True)

@alexa.intent_handler("AMAZON.YesIntent")
def get_yesaccount_nearby_handler(request):
    followMessage = "Great! We are extracting the best card for you based on your past transactions..." \
    " Based on your past transactions, we recommend Capital One's VentureOne Rewards Card." \
    " A confirmation email has been sent to your email address. Have a nice day!"
    server = smtplib.SMTP('smtp.gmail.com', 587)
    server.starttls()
    server.login(fromaddr, password)
    text = msg.as_string()
    server.sendmail(fromaddr, toaddr, text)
    server.quit()
    return alexa.create_response(message=followMessage, end_session=True)

@alexa.intent_handler("AMAZON.HelpIntent")
def help_intent_handler(request):
    return alexa.create_response(message="This skill helps you build your capital one card.", end_session=False)

@alexa.intent_handler("AMAZON.StopIntent")
def stop_intent_handler(request):
    return alexa.create_response(message="Bye!", end_session=True)

@alexa.intent_handler("AMAZON.CancelIntent")
def cancel_intent_handler(request):
    return alexa.create_response(message="Bye!", end_session=True)