import os
from pathlib import Path

current_dir = str(Path().absolute()).replace("\\","/")


def ifPath(value):
    return os.path.exists(current_dir + '/' + value)

def makeDir(value):
    os.mkdir(current_dir + '/' + value)

def makeFile(value):
    return open(current_dir + '/' + value, 'w')


page_name = str(input("Ingrese el nombre de la nueva pagina: "))

    
if ifPath('pages/' + page_name + '.js') is False:
    file = makeFile('pages/' + page_name + '.js')
    file.write('page(\n')
    file.write('  {\n')
    file.write("    page: '" + page_name + "',\n")
    file.write('    components: []\n')
    file.write('  }\n')
    file.write(');\n')
    file.close()
else:
    print('La pagina existe')

    