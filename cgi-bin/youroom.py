import cgi
import cgitb
import os
from threading import Timer

cgitb.enable()

form = cgi.FieldStorage()
if "link" in form:
	global youtubeLink
	youtubeLink = form.getvalue("link")
	open("./rooms/main.txt", "w").write(youtubeLink)

youtubeLink = open("./rooms/main.txt", "r").read()

print('Content-type: text/html')
print()
print('''
<html>
	<head>
		<title>
			YouRoom
		</title>
	</head>
	<body id="body">
		<form action="youroom.py" method="post">
			Youtube link: http://www.youtube.com/watch?v=<input type="text" name="link" value="'''+youtubeLink+'''" style="width:30%;"/>
			<input type="submit" value="Play">
		</form>



		''')

#def checkYoutube():
#	global youtubeLink
#	oldYoutubeLink = youtubeLink
#	youtubeLink = open("./rooms/main.txt", "r").read()
#	if oldYoutubeLink != youtubeLink:
#		print('<iframe width="560" height="315" src="//www.youtube.com/embed/'+youtubeLink+'" frameborder="0" allowfullscreen></iframe>')
#	check = Timer(1, checkYoutube)
#	check.start()

#check = Timer(1, checkYoutube)
#check.start()