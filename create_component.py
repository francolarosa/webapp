import os
from pathlib import Path

current_dir = str(Path().absolute()).replace("\\","/")


def convertClassComponent(key):
    words = key.split('-')
    formatted = ''
    for word in words:
        formatted += word.capitalize()
    return formatted


if os.path.exists(current_dir + '/components'):
    component_name = str(input("Ingrese el nombre del componente: "))
    os.mkdir(current_dir + '/components/' + component_name)
    component_script = open(current_dir + '/components/' + component_name + '/' +  component_name + '.js', 'w')
    component_styles = open(current_dir + '/components/' + component_name + '/' +  component_name + '.css', 'w')
    classFormated = convertClassComponent(component_name)
    component_script.write('class '+ classFormated +' extends Component {')
    component_script.write("\n")
    component_script.write("  static get properties() {\n")
    component_script.write("    return {};\n")
    component_script.write("  }\n\n")
    component_script.write("  static get is() {return '"+ component_name +"';}\n\n")
    component_script.write("  constructor() {super();}\n\n")
    component_script.write("  connectedCallback() {}\n\n")
    component_script.write("  attributeChangedCallback(name, oldValue, newValue) {}\n\n")
    component_script.write("  render() { \n")
    component_script.write("    return ``;\n")
    component_script.write("  }\n")
    component_script.write("}")
    component_script.write("\n\n")
    component_script.write("window.customElements.define("+ classFormated +".is, "+ classFormated +")")
    component_script.close()
else:
    os.mkdir(current_dir + '/components')
    
    
