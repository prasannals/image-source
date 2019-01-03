# Image Source

<img src="https://i.imgur.com/9xZtAPU.png" width="250" /> <img src="https://i.imgur.com/P1tdTeK.png" width="250" /> <img src="https://i.imgur.com/cpQOZ9K.png" width="250" />

<img src="https://i.imgur.com/0tP88NG.png" width="250" /> <img src="https://i.imgur.com/FXDZJT0.png" width="250" /> <img src="https://i.imgur.com/FOVTaYw.png" width="250" />

Prediction Demo - https://youtu.be/Fe8uBVMcH8U

Expo Link (download the <a href="https://play.google.com/store/apps/details?id=host.exp.exponent">Expo app on Play Store</a> to try Image Source) - https://expo.io/@prasannals/image-source

Usage instructions and server code - https://github.com/prasannals/image_source_server

Image Source App Code - https://github.com/prasannals/image-source

<strong>Functionality</strong>
* App is aimed at helping computer vision practitioners collect and send data to their predictive ML models easily.
* Users can click pics, categorize and store the pics in folders within the app.
* Send all the pics to the server with one click.
* Prediction can be done using existing the phones camera. The image will be sent to server and the prediction will be displayed.
* Can remotely signal the ML model to train itself on the data.
* In the backend, the user of the framework has to implement "train" and "predict" methods and has to pass it into the framework which then handles setting up server, receiving images, storing images, delegating requests to appropriate methods and returning prediction responses.


<strong>Under the Hood</strong>
* Created using <a href="https://facebook.github.io/react-native/">React Native</a> (apps are written in JavaScript) and the <a href="https://expo.io/">Expo</a> framework. 
* Backend is written in Python. Uses Flask server.
