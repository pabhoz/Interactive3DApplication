#!/bin/bash
#crear carpeta CG
mkdir CG
#Mover mi posición a la carpeta CG
cd CG
#Descargar las bibliotecas a una carpeta libs
git clone https://github.com/pabhoz/CG-2019-I-Libs libs
#Descargar el proyecto
git clone https://github.com/pabhoz/Interactive3DApplication
#Descargar threejs
git clone https://github.com/mrdoob/three.js/
#Renombrar el index.php de htdocs
mv ../index.php ../index.php_old