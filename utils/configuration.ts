export const configuration = {
  appId: "com.computerlist.app",
  nameApp: "Computer List",
  title: "title",
  description: "",
  openGraph: {
    title: "Computer List",
    description: "Simple tool to manage your computer list",
    url: "https://computer.list", // soon link to the app
    image: "image",
    width: 600,
    height: 600,
    alt: "hello",
  },
  firebase: {
    apiKey: "AIzaSyDB6kaXHG4Hycn-C57tgXZkz2CQeIm0Cs8",
    authDomain: "fir-b57a9.firebaseapp.com",
    projectId: "fir-b57a9",
    storageBucket: "fir-b57a9.appspot.com",
    messagingSenderId: "300061913823",
    appId: "1:300061913823:web:e6b954d7671f7260f9ef6a",
    measurementId: "G-WWSQ79NKM2",
  },
  regex: {
    email:
      /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    password:
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
    name: /^[a-zA-Z\s]{1,}$/,
  },
};
