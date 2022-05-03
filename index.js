fuente = ''
pagina = 1
busqueda = ""

window.onload = function(){
filtros()
menos = document.getElementById("menos")

};

function loadDoc(r) {
  document.getElementById("visible").className = "visible"

  noticias = document.getElementById("noticias")
  if(r == 0){
    pagina = 0

    noticias.innerHTML = ""
    noticias.innerHTML += '<div class="no"><br><br><h1>No se ha seleccionado ninguna fuente</h1></div>'
    document.getElementById("visible").className = "novisible"
  }
  else{
    if(document.getElementById("noposterior"))
      {document.getElementById("noposterior").id = "más"}
    var url = 'https://newsapi.org/v2/everything?' +
          'q=' + busqueda + '&' +
          'sources=' + fuente + '&' +
          'page=' + pagina + '&' + 
          'from=2022-04-18&' +
          'apiKey=612b24f0daea447b923825058123fd99 ';
    var xhttp = new XMLHttpRequest();
    noticias.innerHTML = ''
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
       objeto = JSON.parse(this.responseText)
       contador = 0
        maquetar(objeto)
        document.getElementById("visible").className = "novisible"
        window.scrollTo( 0, 0 );
      }
    };
    xhttp.open("GET", url, true);
    xhttp.send();


  }}  


  function maquetar(objeto){
    if (pagina <= 1){
      menos.id = "noanterior"
    }
    else if(document.getElementById("noanterior")){
      document.getElementById("noanterior").id = "menos"
  
    }
    objetos = 0
    if (objeto.totalResults<10){
      document.getElementById("más").id = "noposterior"
}
    for (i=0;i<objeto.articles.length;i++){
      objetos += 1
        contador += 1
        noticias.innerHTML += `<div id = ${contador} class="noticia">
                                    <div class="info">
                                    <p>${objeto.articles[i].publishedAt}</p>
                                    <h2>${objeto.articles[i].title}</h2>
                                    <p>${objeto.articles[i].description}</p>
                                    <p>${objeto.articles[i].source.name}</p>
                                    <a href="${objeto.articles[i].url}" target="_blank">Enlace sitio WEB ></a>
                                    </div>
                                    <div class="img"><img src="${objeto.articles[i].urlToImage}"></div>
                                </div>`
      }
  }

  function filtros(e){
      fuente = ''
      pagina  = 1
      window.buscador.value = ""
      busqueda = ""
      if(document.formulario.marca.checked){
          fuente += 'marca,'
      }
      if(document.formulario.independent.checked){
          fuente += 'independent,'
      }
      if(document.formulario.ansa.checked){
        fuente += 'ansa,'
      }
      if(document.formulario.ign.checked){
        fuente += 'ign,'
      }
      if(document.formulario.globo.checked){
        fuente += 'globo,'
      }
      if(!document.formulario.marca.checked && !document.formulario.independent.checked && !document.formulario.ansa.checked && !document.formulario.ign.checked && !document.formulario.globo.checked){
        if(document.getElementById("más"))
          document.getElementById("más").id = "noposterior"
        if(document.getElementById("menos"))
          document.getElementById("menos").id = "noanterior"
        return loadDoc(0)
      }
      
      loadDoc(1)
  }


  function pg(p){
    if(p == 1)
      pagina += 1
    else
      pagina -= 1
    loadDoc(1)
  }

  function buscar(e){
    e.preventDefault()
    pagina = 1
    busqueda = window.buscador.value
    fuente = ""
    for (i=0;i<6;i++){
      if(document.formulario[i].checked)
        document.formulario[i].checked = false
    }
    loadDoc(1)
  }