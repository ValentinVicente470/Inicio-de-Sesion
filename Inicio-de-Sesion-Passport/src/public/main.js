const sockets = io.connect()

function addProduct(e) {
    const product = {
        name: document.getElementById("name").value,
        price: document.getElementById("price").value,
        stock: document.getElementById("stock").value,
        description: document.getElementById("description").value,
        thumbnail: document.getElementById("thumbnail").value
    }
    sockets.emit("new-product", product);
    return false
}

function render(data) {
    try {
        if(data.length > 0) {
            const html = data.map((elem, index) => {
                return(`<tr>
                <td> ${elem.name} </td>
                <td> ${elem.price} </td>
                <td> ${elem.description} </td>
                <td> ${elem.stock} </td>
                <td> <img src="${elem.thumbnail}" height="50px"> </img> </td>
                <td> ${elem.id} </td>
                <td> <a class="btn btn-danger material-symbols-outlined" href="http://localhost:8080/delete/${elem.id}"> delete </a></td></tr>`)
            }).join(" ")
            document.getElementById("product").innerHTML = html
        } else {
            const htmlErr = `<h3 class="prod__error">No se encontraron productos :/</h3>`
            document.getElementById('product').innerHTML = htmlErr
        }
    } catch (error) {
        console.error(error)
    }
}

sockets.on("product", function(data) {render(data)})


///


function addMessage(a) {
    let date = new Date();
    const message = {
        email: document.getElementById("username").value,
        text: document.getElementById("text").value,
        fecha: date.toLocaleDateString(),
        hora: date.toLocaleTimeString(),
    }
    sockets.emit("new-message", message);
    return false
}

function renders(dato) {
    try {
        if(dato.length > 0){
            const html2 = dato.map((element) => {
                return(`<div class="row">
                    <div class="col">
                        <h3 class="mail_chat">${element.email}:</h3>
                    </div>
                    <div class="col gx-0">
                        <h3 class="text_chat">${element.text}</h3>
                    </div>
                    <div class="col gx-0">
                        <h3 class="hora_chat">[${element.hora}]</h3>
                    </div>
                </div>`)
            }).join(" ")
        
            document.getElementById("messages").innerHTML = html2
        } else {
            const errHtml = `<p class="chat__err">Aún no hay mensajes :( ¡Sé el primero en enviar uno!</p>`
            
            document.getElementById("messages").innerHTML = errHtml
        }
        
    } catch (err) {
        console.log(err)
    }
}

sockets.on("messages", function(dato) {renders(dato)})