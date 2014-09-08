from http.server import HTTPServer
from http.server import CGIHTTPRequestHandler

port = 12975
host = ''
server_address = (host,port)
CGIHTTPRequestHandler.cgi_directories
httpd = HTTPServer(server_address,CGIHTTPRequestHandler)
print("CGI scripts run from "+str(CGIHTTPRequestHandler.cgi_directories))
print("Starting my web server on port "+str(port))
httpd.serve_forever()
