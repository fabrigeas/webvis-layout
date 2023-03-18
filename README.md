# webvis-layout
An alternative layout to webvisApp. see https://repo.threedy.io/assessments/app_dev

## Quick start

To run this app, download it to the computer and open the browser to the location of this project's index.html file.
That is it. 

## Todo

- implement highlight on menu items in the following way
  - add onmouseover event to .label which adds a .highlight class to this as well as adds the corresponding nodeId to selectedNodeLeafs
  - add onmouseleave ebent to .label which removes the .highlight class as well as removing the nodeId from selectedNodeLeafs iff node is not selected

