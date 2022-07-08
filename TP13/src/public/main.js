const sockets = io.connect()

//--------PRODUCTOS------------------------------------------------------------------------

function addProducto(a) {

    const producto = {
        name: document.getElementById ("name").value,
        description: document.getElementById ("description").value,
        code: document.getElementById ("code").value,
        price: document.getElementById ("price").value,
        thumbnail: document.getElementById ("thumbnail").value,
    }

    sockets.emit ('new-producto', producto)

    return false
}

function render (data) {
    try{
        if(data.length > 0){
            const html = data.map ((elem, index) => {
                return (
                    
                    `<tr>
                        <td>${elem.name}</td>
                        <td>${elem.description}</td>
                        <td>${elem.code}</td>
                        <td>${elem.price}</td>
                        <td> <img src="${elem.thumbnail}" height="50px"> </img> </td>
                        <td>${elem.id}</td> 
                    </tr>`
                )
    
            }).join(' ')
            document.getElementById("productos").innerHTML = html
        }
        else{
            const errHtml = `<p> No hay productos </p>`
            document.getElementById("productos").innerHTML = errHtml
        }
        
    }
    catch(error){
        console.log(error)
    }
}

sockets.on('productos', function(data) {render(data)})


//--------CHAT------------------------------------------------------------------------------

function addMessage(o) {

    let date = new Date();

    const message = {

        author: 
            {
            mail: document.getElementById("mail").value,
            nombre: document.getElementById("nombre").value,
            apellido: document.getElementById("apellido").value,
            edad: document.getElementById("edad").value,
            alias: document.getElementById("alias").value,
            avatar: document.getElementById("avatar").value,
            },
        text: document.getElementById("text").value,
        fecha: date.toLocaleDateString(),
        hora: date.toLocaleTimeString(),    

    }

    sockets.emit("new-message", message);
    return false
}

function renders(dato) {
    try{
        if(dato.length > 0){
            const html1 = dato.map((element, index) => {  
                return(`<div>
                            <div class="Cont_todo">

                                <strong>${element.author.mail}</strong>
                                <em class="Usuario_mensj">${element.text}</em>

                            </div>
                     </div>`)

            }).join(' ')
            document.getElementById("messages").innerHTML = html1   
        }
        else{
            const errHtml = `<p> No hay mensajes </p>`
            document.getElementById("messages").innerHTML = errHtml
        }
    }
    catch(error){
        console.log(error)
    }
}

sockets.on('messages', function(dato) {renders(dato)})

