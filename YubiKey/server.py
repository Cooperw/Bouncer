#!/usr/bin/env python
import sys
sys.path.insert(1, '.')
import YubiKey

if sys.version_info[0] < 3:
    # python 2 import
    from BaseHTTPServer import BaseHTTPRequestHandler, HTTPServer
else:
    # python 3 import
    from http.server import BaseHTTPRequestHandler, HTTPServer

class BaseServer(BaseHTTPRequestHandler):
    def do_GET(self):
        self.wfile.write(str(user.getUserId)
                            .encode('utf-8'))

    def do_POST(self):
        content_length = int(self.headers['Content-Length'])
        post_data = self.rfile.read(content_length)
        self.wfile.write("<html><body><p>"+str(user.sign(post_data))+"</p><p>%s</p></body></html>"
                            .encode('utf-8') % post_data)

def run(server_class=HTTPServer, handler_class=BaseServer, port=80):
    server_address = ('127.0.0.1', port)
    httpd = server_class(server_address, handler_class)
    global user
    user = YubiKey.YubiKey(1234, "id01"+str(port))
    print('HTTP server running on port %s'% port)
    httpd.serve_forever()

if __name__ == "__main__":
    from sys import argv

    if len(argv) == 2:
        run(port=int(argv[1]))
    else:
        run()
