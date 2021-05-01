declare let Email: any;

sendEMail(){

  Email.send({
    Host : 'smtp.mailtrap.io',
    Username : '173b79df9af293',
    Password : '3740a47b81424f',
    To : 'pagspam99@gmail.com',
    From : 'f6a735e606-f91dda@inbox.mailtrap.io',
    Subject : 'hola',
    Body :
    '<h1>Hola, esto es una prueba.</h1> <br/> '+
    '<b>EL grupo mas wapo es el de MDA</b>'
    }).then( message => {alert('Tu correo se ha enviado correctamente');} );
    }
