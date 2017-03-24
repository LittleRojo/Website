#from app import app
from flask import Flask, render_template
from flask.ext.socketio import SocketIO, emit

application = Flask(__name__)
socketio = SocketIO(application)

values = {
    'slider1': 25,
    'slider2': 0,
}

@application.route('/')
def index():
    return render_template('main.html', **values)

@socketio.on('value changed')
def value_changed(message):
    values[message['who']] = message['data']
    emit('update value', message, broadcast=True)

if __name__ == '__main__':
    socketio.run(application, host='0.0.0.0:9903')
