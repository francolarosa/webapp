import os
from pathlib import Path

current_dir = str(Path().absolute()).replace("\\","/")

components_list = os.listdir(current_dir + '/components')
pages_list = os.listdir(current_dir + '/pages')

indexHTML = open(current_dir + '/index.html', 'w')

indexHTML.write('<!DOCTYPE html>\n')
indexHTML.write('<html lang="es">\n')
indexHTML.write('<head>\n')
indexHTML.write('    <meta charset="UTF-8">\n')
indexHTML.write('    <meta http-equiv="X-UA-Compatible" content="IE=edge">\n')
indexHTML.write('    <meta name="viewport" content="width=device-width, initial-scale=1.0">\n')
indexHTML.write('    <script src="core/Component.js"></script>\n')
indexHTML.write('    <script src="config/_pages.js"></script>\n')
indexHTML.write('    <!-- Components -->\n')

for component in components_list:
    indexHTML.write('    <script src="components/' + component + '/' + component + '.js"></script>\n')





indexHTML.write('    <!---->\n')
indexHTML.write('    <script src="core/page-manager-template/page-manager-template.js"></script>\n')
indexHTML.write('    <title></title>\n')
indexHTML.write('</head>\n')
indexHTML.write('<body>\n')
indexHTML.write('    <page-manager-template></page-manager-template>\n')
indexHTML.write('    <!-- Pages -->\n')

for page in pages_list:
    indexHTML.write('    <script src="pages/' + page + '"></script>\n')



indexHTML.write('    <!---->\n')
indexHTML.write('    <script src="config/_config.js"></script>\n')
indexHTML.write('</body>\n')
indexHTML.write('</html>')