#include <ESP8266WiFi.h>
#include <WiFiClientSecure.h>
#include <FirebaseArduino.h>

// se definen las variables para la conexion a firebase database
#define FIREBASE_HOST "proyecto-robotica-35bed.firebaseio.com"   // host de la base de datos
#define FIREBASE_AUTH "Vtp3BkKGm0dMSoGPQ3CO9JVJky9K3RTijyuTDSxl" // clave privada de la base de datos

// se definen las variables para la conexion a internet mediante wifi
#define STASSID "Familia_Reyes_Jimenez"
#define STAPSK "D@phne141212"
const char *ssid = STASSID;
const char *contrasena = STAPSK;

// se definen las variables de conexion al servidor
const char *host = "enviardatosfirestorepiscis.herokuapp.com";
const int httpsPort = 443;

// se definen las variables controladoras paras los meses
String meses[12] = {"Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"};

// se definen las variables que contendran los datos
int PH = 0;            //nivel de ph
int oxigeno = 0;       // nivel de oxigeno
int turbidad = 0;      //nivel de turbiedad
int viscosidad = 0;    //nivel de viscosidad
int nPurificacion = 0; //nivel de purificacion del agua
int nAgua = 0;         //nivel del agua
int temperatura = 0;   // nivel de temperatura
int humedad = 0;       //nivel de humedad

// se define la variable que contendra la cadena para la peticion principal
String contenido = "";

void setup()
{
  Serial.begin(115200); // se inicializa la conexion serial a 9600 baudios
  pinMode(D1, OUTPUT);
  pinMode(LED_BUILTIN, OUTPUT);
  digitalWrite(LED_BUILTIN, HIGH);

  // se conecta al wifi.
  WiFi.begin(ssid, contrasena);
  Serial.print("connecting");
  while (WiFi.status() != WL_CONNECTED) // se verifica el estado de la conexion
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println();
  Serial.print("Conectado a: ");  // se imprime cuando ya se conectó
  Serial.println(WiFi.localIP()); // se imprime la direccion ip

  // se inicializa la conexion a la base de datos con los parametros ya establecidos
  Firebase.begin(FIREBASE_HOST, FIREBASE_AUTH); // se inicializa la conexion
  // se inicializa el subir a firestore a 1 para controlar su primera subida
  Firebase.setFloat("Subir_Firestore", 1);
}

void loop() // funcion del loop
{
  int subirFirestore = Firebase.getInt("Subir_Firestore"); // cada determinado tiempo se leen los datos para saber si se va a subir o no a firestore
  int actualizarReal = Firebase.getInt("Actualizar_Real"); // cada determinado tiempo se leen los datos para saber si se va a actualizar el contenido del tiempo real
  if (subirFirestore == 1)                                // condicional para realizar ordenes
  {
    // si la condicion es verdadera se ejecuta el siguiente código
    leerDatos();       // se manda a llamar a la funcion para almacenar los datos
    generarPeticion(); // se manda a llamar a la funcion para generar la peticion con los datos almacenados
    enviarPeticion("/enviarafirestore");  // se manda a llamar a l funcion para generar el archivo json con los datos ya almacenados
  } else if (actualizarReal == 1) {
    leerDatos();
    generarPeticion();
    enviarPeticion("/enviarafirebase");
  }
  /*if (led == 0)
    {
    Firebase.set("LED_STATUS", 1);
    digitalWrite(D1, HIGH);
    led = 1;
    delay(50);
    digitalWrite(D1, LOW);
    }
    else
    {
    Firebase.set("LED_STATUS", 0);
    digitalWrite(LED_BUILTIN, HIGH);
    led = 0;
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    }*/
  delay(1000); // se repite este codigo cada hora
}

// se define una funcion para leer los datos
void leerDatos()
{
  temperatura = random(25, 31);   // se establece la temperatura a un valor aleatorio entre 25 y 31
  humedad = random(0, 100);       // se establece la humedad a un valor aleatorio entre 0 y 100
  PH = random(1, 14);             // se establece el ph a un valor aleatorio entre 1 y 14
  oxigeno = random(0, 100);       // se establece el oxigeno a un valor aleatorio entre 0 y 100
  turbidad = random(300, 900);    // se establece la turbiedad a un valor aleatorio entre 0 y 100
  viscosidad = random(0, 100);    // se establece la viscosidad a un valor aleatorio entre 0 y 100
  nPurificacion = random(0, 100); // se establece el nivel de purificacion del agua a un valor aleatorio entre 0 y 100
  nAgua = random(0, 100);         // se establece el nivel del agua a un valor aleatorio entre 0 y 100
}

// se define una funcion para generar la cadena de peticion con los datos correspondientes
String generarPeticion()
{
  String peticion = "?";
  peticion += "temperatura=";
  peticion += temperatura;
  peticion += "&humedad=";
  peticion += humedad;
  peticion += "&ph=";
  peticion += PH;
  peticion += "&oxigeno=";
  peticion += oxigeno;
  peticion += "&turbiedad=";
  peticion += turbidad;
  peticion += "&viscosidad=";
  peticion += viscosidad;
  peticion += "&nivelpurificacion=";
  peticion += nPurificacion;
  peticion += "&nivelagua=";
  peticion += nAgua;
  contenido = peticion;
  return peticion;
}

void enviarPeticion(String destino)
{
  if (destino == "/enviarafirebase") {
    subirAFirebase();
  } else {
    subirAFirestore();
  }
}

void subirAFirebase() {
  Firebase.setFloat("Actualizar_Real", 0);
  // Se utiliza la clase de WiFiClientSecure para crear una conexion TLS
  WiFiClientSecure client;
  Serial.print("Conectando a ");
  Serial.println(host);

  // se verifica si la conexion fue correcta o no
  if (!client.connect(host, httpsPort))
  {
    // en caso de no ser correcta
    Serial.println("Conexion Fallida!");
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else
  {
    // en caso de ser correcta
    Serial.println("Conexion exitosa");
    digitalWrite(D1, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(D1, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(D1, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(D1, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(D1, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(D1, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
  }

  // Se crea la variable que almacenara toda la peticion
  String url = "/enviarafirestore" + contenido; // se concatena el contenido de la variable
  Serial.println("Enviando Contenido: " + url);

  // se realiza la peticion al servidor
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Connection: close\r\n\r\n");

  Serial.println("Peticion Enviada"); // se confirma el envio de la peticion

  // se observa que mientras el dispositivo aun este conectado al servidor
  while (client.connected())
  {
    String line = client.readStringUntil('\n'); // lee todas las lineas que tiene el response y se almacena en una variable temporal
    if (line == "\r")
    { // se observa que la linea contenta el caracter especial para determinar el estado de los headers
      Serial.println("headers recibidos");
      break; // se sale del condicional
    }
  }
  String line = client.readStringUntil('\n');
  if (line.startsWith("Datos subidos a firestore"))
  {
    Serial.println("esp8266/Arduino CI completado!");
    digitalWrite(D1, HIGH);
    delay(50);
    digitalWrite(D1, LOW);
  }
  else if (line.startsWith("Datos actualizados")) {
    Serial.println("esp8266/Arduino Actualizacion CI completado!");
    digitalWrite(D1, HIGH);
    delay(50);
    digitalWrite(D1, LOW);
  }
  else {
    Serial.println("esp8266/Arduino CI ha fallado");
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
  }
  Serial.println("La respuesta fue:"); // se confirma la respuesta del servidor
  Serial.println("==========");
  Serial.println(line); // se imprime la respuesta
  Serial.println("==========");
  Serial.println("Cerrando la Conexion"); // se cierra la conexion con el servidor
}

void subirAFirestore() {
  Firebase.setFloat("Subir_Firestore", 0);
  // Se utiliza la clase de WiFiClientSecure para crear una conexion TLS
  WiFiClientSecure client;
  Serial.print("Conectando a ");
  Serial.println(host);

  // se verifica si la conexion fue correcta o no
  if (!client.connect(host, httpsPort))
  {
    // en caso de no ser correcta
    Serial.println("Conexion Fallida!");
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
  }
  else
  {
    // en caso de ser correcta
    Serial.println("Conexion exitosa");
    digitalWrite(D1, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(D1, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(D1, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(D1, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
    delay(50);
    digitalWrite(D1, HIGH);
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(D1, LOW);
    digitalWrite(LED_BUILTIN, HIGH);
  }

  // Se crea la variable que almacenara toda la peticion
  String url = "/enviarafirestore" + contenido; // se concatena el contenido de la variable
  Serial.println("Enviando Contenido: " + url);

  // se realiza la peticion al servidor
  client.print(String("GET ") + url + " HTTP/1.1\r\n" +
               "Host: " + host + "\r\n" +
               "User-Agent: BuildFailureDetectorESP8266\r\n" +
               "Connection: close\r\n\r\n");

  Serial.println("Peticion Enviada"); // se confirma el envio de la peticion

  // se observa que mientras el dispositivo aun este conectado al servidor
  while (client.connected())
  {
    String line = client.readStringUntil('\n'); // lee todas las lineas que tiene el response y se almacena en una variable temporal
    if (line == "\r")
    { // se observa que la linea contenta el caracter especial para determinar el estado de los headers
      Serial.println("headers recibidos");
      break; // se sale del condicional
    }
  }
  String line = client.readStringUntil('\n');
  if (line.startsWith("Datos subidos a firestore"))
  {
    Serial.println("esp8266/Arduino CI completado!");
    digitalWrite(D1, HIGH);
    delay(50);
    digitalWrite(D1, LOW);
  }
  else if (line.startsWith("Datos actualizados")) {
    Serial.println("esp8266/Arduino Actualizacion CI completado!");
    digitalWrite(D1, HIGH);
    delay(50);
    digitalWrite(D1, LOW);
  }
  else {
    Serial.println("esp8266/Arduino CI ha fallado");
    digitalWrite(LED_BUILTIN, LOW);
    delay(50);
    digitalWrite(LED_BUILTIN, HIGH);
  }
  Serial.println("La respuesta fue:"); // se confirma la respuesta del servidor
  Serial.println("==========");
  Serial.println(line); // se imprime la respuesta
  Serial.println("==========");
  Serial.println("Cerrando la Conexion"); // se cierra la conexion con el servidor
}

