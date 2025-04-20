import http.server
import socketserver
import webbrowser
import os

# Set the port
PORT = 8666

# Set working directory to where this script and HTML files are located
web_dir = os.path.dirname(os.path.abspath(__file__))
os.chdir(web_dir)

# Create a simple HTTP request handler
Handler = http.server.SimpleHTTPRequestHandler

# Create and start the server
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving website at http://localhost:{PORT}/index.html")
    webbrowser.open(f"http://localhost:{PORT}/index.html")  # Open index.html for login
    httpd.serve_forever()
