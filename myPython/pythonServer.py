# set async_mode to 'threading', 'eventlet', 'gevent' or 'gevent_uwsgi' to
# force a mode else, the best mode is selected automatically from what's
# installed
async_mode = None

import time
from flask import Flask, render_template
import socketio

sio = socketio.Server(logger=True, async_mode=async_mode)
application = Flask(__name__)
application.wsgi_app = socketio.Middleware(sio, application.wsgi_app)
application.config['SECRET_KEY'] = 'secret!'
thread = None


def background_thread():
    return
    """Example of how to send server generated events to clients."""
    count = 0
    while True:
        sio.sleep(10)
        count += 1
        sio.emit('my response', {'data': 'Server generated event'},
                 namespace='/test')


@application.route('/')
def main():
    global thread
    if thread is None:
        thread = sio.start_background_task(background_thread)
    return render_template('main.html')


@sio.on('my event', namespace='/test')
def test_message(sid, message):
    sio.emit('Test', {'data': message['data']}, room=sid,
             namespace='/test')


@sio.on('my broadcast event', namespace='/test')
def test_broadcast_message(sid, message):
    sio.emit('Broadcast', {'data': message['data']}, namespace='/test')


@sio.on('join', namespace='/test')
def join(sid, message):
    sio.enter_room(sid, message['room'], namespace='/test')
    sio.emit('Join Room', {'data': 'Entered room: ' + message['room']},
             room=sid, namespace='/test')


@sio.on('leave', namespace='/test')
def leave(sid, message):
    sio.leave_room(sid, message['room'], namespace='/test')
    sio.emit('Leaving Room', {'data': 'Left room: ' + message['room']},
             room=sid, namespace='/test')


@sio.on('close room', namespace='/test')
def close(sid, message):
    sio.emit('Closing Room',
             {'data': 'Room ' + message['room'] + ' is closing.'},
             room=message['room'], namespace='/test')
    sio.close_room(message['room'], namespace='/test')


@sio.on('my room event', namespace='/test')
def send_room_message(sid, message):
    sio.emit('Room Message', {'data': message['data']}, room=message['room'],
             namespace='/test')


@sio.on('disconnect request', namespace='/test')
def disconnect_request(sid):
    sio.disconnect(sid, namespace='/test')


@sio.on('connect', namespace='/test')
def test_connect(sid, environ):
    sio.emit('Server', {'data': 'Connected', 'count': 0}, room=sid,
             namespace='/test')


@sio.on('disconnect', namespace='/test')
def test_disconnect(sid):
    print('Client disconnected')


if __name__ == '__main__':
    if sio.async_mode == 'threading':
        # deploy with Werkzeug
        application.run(threaded=True)
    elif sio.async_mode == 'eventlet':
        # deploy with eventlet
        import eventlet
        import eventlet.wsgi
        eventlet.wsgi.server(eventlet.listen(('127.0.0.1', 9902)), application)
    elif sio.async_mode == 'gevent':
        # deploy with gevent
        from gevent import pywsgi
        try:
            from geventwebsocket.handler import WebSocketHandler
            websocket = True
        except ImportError:
            websocket = False
        if websocket:
            pywsgi.WSGIServer(('127.0.0.1', 9902), application,
                              handler_class=WebSocketHandler).serve_forever()
        else:
            pywsgi.WSGIServer(('127.0.0.1', 9902), application).serve_forever()
    elif sio.async_mode == 'gevent_uwsgi':
        print('Start the application through the uwsgi server. Example:')
        print('uwsgi --http :9902 --gevent 1000 --http-websockets --master '
              '--wsgi-file app.py --callable app')
    else:
        print('Unknown async_mode: ' + sio.async_mode)