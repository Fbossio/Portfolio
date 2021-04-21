from flask import Flask, render_template
from flask_mail import Mail, Message
from config import config
from threading import Thread

app = Flask(__name__)
app.config.from_object(config['development'])
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

@app.route("/send_email")
def send_email():    
    
    msg = Message('Hello', sender = 'yourId@gmail.com', recipients = ['felixbossio@gmail.com'])
    msg.body = "Hello Flask message sent from Flask-Mail"
    send_async_email(app, msg)
    return '<h1>Message sent</h1>'
    
    

