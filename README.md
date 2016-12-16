# julie-and-julia

This app is text visualization of the film Julie &amp; Julia (2009) script. Mobile phone is supported but the SVG visualiation is hidden.

This project was bootstrapped with [Create React App](https://github.com/facebookincubator/create-react-app). You can learn the most recent version of the package [here](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).

### Complile LESS

```
cd julie-and-jula/src
lessc index.less index.css
```

### Secret message

This enables to show a secret message when the password is typed. Make sure that the password should return 0 results via normal search. Tell your friend the password, so they can read your secret message.

See ```src/constants/secrets.local``` and modify the secret message. Then copy the file as json. ```cp secrets.local secrets.json```

### Data Source

[Julie & Julie Script](http://www.script-o-rama.com/movie_scripts/j/julie-and-julia-script-transcript.html)