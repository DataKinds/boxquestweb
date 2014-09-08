import cgi
import cgitb
import os
from datetime import datetime
import urllib.request

cgitb.enable()

hits = int(open("./logs/hits.txt", "r").read())
hits = hits + 1
open("./logs/hits.txt", "w").write(str(hits))
geo = urllib.request.urlopen('http://api.hostip.info/get_html.php?ip='+os.environ["REMOTE_ADDR"]).read()
geoArray = geo.splitlines()
open("./logs/ip.txt", "a").write(datetime.now().strftime("[%m/%d/%Y %H:%M:%S] ")+os.environ["REMOTE_ADDR"]+" "+geoArray[0].decode(encoding='UTF-8')+" "+geoArray[1].decode(encoding='UTF-8')+"\n")

print('Content-type: text/html')
print()
print('<html style="font-family: monospace;"><head><title>')
print('BoxQuest: The Legend of Box')
print('</title>')
print('&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_____&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;_&nbsp;&nbsp;&nbsp;<br>|&nbsp;__&nbsp;&nbsp;|&nbsp;___&nbsp;&nbsp;_&nbsp;_&nbsp;|&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|&nbsp;_&nbsp;_&nbsp;&nbsp;___&nbsp;&nbsp;___&nbsp;|&nbsp;|_&nbsp;<br>|&nbsp;__&nbsp;-||&nbsp;.&nbsp;||_"_||&nbsp;&nbsp;|&nbsp;&nbsp;||&nbsp;|&nbsp;||&nbsp;-_||_&nbsp;-||&nbsp;&nbsp;_|<br>|_____||___||_,_||__&nbsp;&nbsp;_||___||___||___||_|&nbsp;&nbsp;<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;|__|<br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<img src="../img/b.png"></img><br>')
print('</head>')
print('<body id="body">')
print('<h3>Help</h3><hr>Press the "Start the boxes!" button to begin recieving boxes. When you see a box you don&rsquo;t want, press the cancel button. With the boxes you receive, you can buy upgrades and stuff. Have fun!<br><br><br><h3>Boxes and the Bank</h3><hr>')
print('<button onclick="startLoop()">Start the boxes!</button>')
print('<br><br><div id="points"></div><br><div id="b"><br></div>')
print('<br><br>Put <input type="number" id="bankInput"></input> boxes into the bank <button onclick="deposit()">Deposit</button>')
print('<br><div id="boxesInBank">Boxes in bank: 0</div>')
print('<br><div id="bankInterest">Interest: 0.01% per box</div>')
print('<br>Take out <input type="number" id="bankOutput"></input> boxes <button onclick="withdraw()">Withdraw</button>')

print('<br><br><h3>Crafting/Inventory</h3><hr>')
print('Coming soon(c)')

print('<br><br><br><br><h3>Upgrades</h3><hr>')
print('<button onclick="timeUpgrade()" id="timeB">Buy</button><div id="timeUpgrade"></div>')
print('<br><button onclick="pointsPerBoxUpgrade()" id="pointsPerBoxB">Buy</button><div id="pointsPerBoxUpgrade"></div>')
print('<br><button onclick="antiBoxChanceUpgrade()" id="antiBoxChanceB">Buy</button><div id="antiBoxChanceUpgrade"></div>')
print('<br><button onclick="antiBoxPointsUpgrade()" id="antiBoxPointsB">Buy</button><div id="antiBoxPointsUpgrade"></div>')
print('<br><button onclick="superBoxChanceUpgrade()" id="superBoxChanceB">Buy</button><div id="superBoxChanceUpgrade"></div>')
print('<br><button onclick="superBoxPointsUpgrade()" id="superBoxPointsB">Buy</button><div id="superBoxPointsUpgrade"></div>')
print('<br><button onclick="interestUpgrade()" id="interestB">Buy</button><div id="interestUpgrade"></div>')

print('<br><br><br><br><h3>Shop</h3><hr>')
print('<button onclick="buyShield()">Buy</button><div id="shieldBuy"></div>')

print('<br><br><br><br><h3>Save/Load</h3><hr>')
print('<button id="saveButton" onclick="save()">Save</button>')
print('<button id="loadButton" onclick="load()">Load</button> Copy/Paste in this code to Save/Load your game.<br>')
print('<textarea id="ioBox" cols="75" rows="2"></textarea>')

print('<script type="text/javascript" src="../source.js"></script>')
print('<br><br><br>Hits since I made this counter, 12/10/2013: '+str(hits))
print('<br>Coded completely in Python/Javascript. Looking for the <a href="index-dev.py">dev site? It&rsquo;s not always up though.</a>')
print('</body></html>')
