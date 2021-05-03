from flask import Flask, render_template, request, jsonify
from flask_mail import Mail, Message
from config import config, Config
from threading import Thread
import os

app = Flask(__name__)
app.config.from_object(config[os.environ.get('FLASK_ENV')])
mail = Mail(app)



def asyncf(f):
    def wrapper(*args, **kwargs):
        thr = Thread(target=f, args=args, kwargs=kwargs)
        thr.start()
    return wrapper

@asyncf
def send_async_email(app, msg):
    with app.app_context():
        mail.send(msg)

@app.route("/")
def index():
    return render_template('index.html')

@app.route("/send_email", methods=['POST'])
def send_email():
    name = request.get_json()['name']
    email = request.get_json()['email']
    subject = request.get_json()['subject']
    message = request.get_json()['message']

    subject_str = 'No subject'
    

    if subject:
        subject_str = subject 

    recipient = Config.MAIL_RECIPIENT  
    
    msg = Message(subject_str, sender = email, recipients = [recipient])
    msg.body = f'Sender name: {name}, Sender E-mail: {email}, Message: {message}'
    send_async_email(app, msg)

    return jsonify({})
    
    
    

