-- Drop tables if they exist
IF OBJECT_ID('coches', 'U') IS NOT NULL DROP TABLE coches;
IF OBJECT_ID('marcas', 'U') IS NOT NULL DROP TABLE marcas;
IF OBJECT_ID('reservas', 'U') IS NOT NULL DROP TABLE reservas;
IF OBJECT_ID('usuariosX', 'U') IS NOT NULL DROP TABLE usuariosX;

CREATE TABLE marcas (
  id_marca int NOT NULL IDENTITY(1,1),
  nombre_marca nvarchar(50) NOT NULL,
  descripcion nvarchar(500) NULL,
  imagen_logo nvarchar(100) NULL,
  PRIMARY KEY (id_marca)
);
INSERT INTO marcas 
(nombre_marca, descripcion, imagen_logo) 
VALUES 
('Lamborghini', 'Lamborghini es una marca italiana de autom�viles de lujo fundada en 1963. Sus veh�culos se caracterizan por su dise�o futurista y su desempe�o deportivo excepcional.', 'lamborghini_logo.png'),
('Bugatti', 'Bugatti es una marca francesa de autom�viles de lujo fundada en 1909. Sus veh�culos se destacan por su dise�o aerodin�mico y su desempe�o excepcional, y son algunos de los autos m�s exclusivos y costosos del mundo.', 'bugatti_logo.png'),
('Ferrari', 'Ferrari es una marca italiana de autom�viles de lujo fundada en 1947. Sus veh�culos se caracterizan por su dise�o elegante y deportivo, su desempe�o excepcional y su rica historia en el automovilismo.', 'ferrari_logo.png'),
('Koenigsegg', 'Koenigsegg es una marca sueca de autom�viles de lujo fundada en 1994. Sus veh�culos se caracterizan por su dise�o futurista y su desempe�o excepcional, y son algunos de los autos m�s exclusivos y avanzados tecnol�gicamente del mundo.', 'koenigsegg_logo.png');



-- Create table coches
CREATE TABLE coches (
  id_coche int NOT NULL IDENTITY(1,1),
  nombre_coche nvarchar(100) NOT NULL,
  descripcion_general nvarchar(500) NULL,
  descripcion_frontal nvarchar(500) NULL,
  descripcion_trasera nvarchar(500) NULL,
  color nvarchar(50) NULL,
  plazas int NULL,
  velocidad_max decimal(10,2) NULL,
  cambio nvarchar(50) NULL,
  precio_dia decimal(10,2) NULL,
  precio_semana decimal(10,2) NULL,
  traccion nvarchar(50) NULL,
  potencia_max nvarchar(4) NULL,
  aceleracion decimal(10,2) NULL,
  combustible nvarchar(50) NULL,
  estado nvarchar(50) NULL,
  banner nvarchar(100) NULL,
  imagen1 nvarchar(100) NULL,
  imagen2 nvarchar(100) NULL,
  imagen3 nvarchar(100) NULL,
  imagen4 nvarchar(100) NULL,
  imagen5 nvarchar(100) NULL,
  imagen6 nvarchar(100) NULL,
  imagen7 nvarchar(100) NULL,
  imagen8 nvarchar(100) NULL,
  imagen9 nvarchar(100) NULL,
  imagen10 nvarchar(100) NULL,
  id_marca int NOT NULL,
  PRIMARY KEY (id_coche),
  FOREIGN KEY (id_marca) REFERENCES marcas (id_marca)
);
INSERT INTO coches VALUES ('Lamborghini Hurac�n','Autom�vil deportivo de lujo fabricado por Lamborghini. Reemplaz� al Gallardo en 2014 y es considerado uno de los mejores superdeportivos de su segmento.','Dise�o agresivo y elegante con l�neas futuristas y una imagen cl�sica de Lamborghini. Faros LED y parrilla hexagonal ic�nicos.','Motor de 5.2 litros V10 con 640 caballos de fuerza y 600 Nm de torque. Transmisi�n autom�tica de 7 velocidades. Tracci�n en las cuatro ruedas.','Rojo',2,325.00,'Autom�tico',1000.00,6000.00,'4x4','640',2.90,'Gasolina','Disponible','bannerLm.png','lamHct.png','huracanF.png','huracanT.png','huracanAereo.png','huracanC1.png','huracanC2.png','huracanC3.png','huracanC4.png','huracanC5.png','',1),('Lamborghini Urus','SUV deportivo de lujo fabricado por Lamborghini. Primer SUV producido por la marca desde el LM002 en la d�cada de 1980.','Dise�o agresivo y elegante que combina la forma de un SUV con la deportividad t�pica de Lamborghini. Parrilla hexagonal ic�nica.','Motor de 4.0 litros V8 biturbo con 650 caballos de fuerza y 850 Nm de torque. Transmisi�n autom�tica de 8 velocidades. Tracci�n en las cuatro ruedas.','Negro',5,305.00,'Autom�tico',1500.00,9000.00,'4x4','650',3.60,'Gasolina','Disponible','bannerLm.png','lamUct.png','urusF.png','urusT.png','UrusAerea.png','urusC1.png','urusC2.png','urusC3.png','urusC4.png','urusC5.png','',1),('Lamborghini Aventador','Autom�vil deportivo de lujo fabricado por Lamborghini. Presentado en 2011 como sucesor del Murci�lago.','Dise�o futurista y agresivo con l�neas aerodin�micas y faros LED. Puertas de tijera caracter�sticas de Lamborghini.','Motor de 6.5 litros V12 con 700 caballos de fuerza y 690 Nm de torque. Transmisi�n autom�tica de 7 velocidades. Tracci�n en las cuatro ruedas.','Amarillo',2,350.00,'Autom�tico',2000.00,12000.00,'4x4','700',2.90,'Gasolina','Disponible','bannerLm.png','lamAvct.png','aventadorF.png','aventadorT.png','aventadorAer.png','aventadorC1.jpg','aventadorC2.png','aventadorC3.png','aventadorC4.png','aventadorC5.png','',1),('Lamborghini Veneno','El Lamborghini Veneno es un hypercar de edici�n limitada presentado en 2013 para conmemorar el 50 aniversario de Lamborghini. Solo se produjeron 3 unidades, todas vendidas antes de su presentaci�n oficial. El Veneno es uno de los coches m�s raros y exclusivos del mundo, y ofrece un rendimiento excepcional y una experiencia de conducci�n emocionante.','El dise�o del Lamborghini Veneno es una evoluci�n de los modelos de Lamborghini de la �poca, con l�neas agresivas y aerodin�micas que mejoran su rendimiento. La carrocer�a est� hecha de fibra de carbono y cuenta con un gran aler�n trasero y difusor trasero para mejorar la estabilidad y el agarre. Adem�s, cuenta con detalles en rojo que destacan en contraste con el color negro mate de la carrocer�a.','El Lamborghini Veneno est� equipado con un motor V12 de 6.5 litros que produce una potencia m�xima de 750 caballos de fuerza y 690 Nm de torque. La transmisi�n autom�tica de 7 velocidades y la tracci�n en las cuatro ruedas le permiten acelerar de 0 a 100 km/h en 2.8 segundos y alcanzar una velocidad m�xima de 355 km/h.','Negro mate',2,355.00,'Autom�tico',12000.00,72000.00,'4x4','750',2.80,'Gasolina','Disponible','bannerLm.png','lamVct.png','venenoF.png','venenoT.png','venenoAerea.png','venenoC1.png','venenoC2.png','venenoC3.png','venenoC4.png','venenoC5.png','',1),('Bugatti Veyron','Autom�vil deportivo de alta gama fabricado por Bugatti. Fue el coche m�s r�pido del mundo en su �poca.','Dise�o elegante y aerodin�mico con l�neas curvas y suaves. Faros LED y parrilla ic�nicos de Bugatti.','Motor de 8.0 litros W16 con cuatro turbocompresores que produce 1000 caballos de fuerza y 1250 Nm de torque. Transmisi�n autom�tica de 7 velocidades. Tracci�n en las cuatro ruedas.','Azul',2,407.00,'Autom�tico',12000.00,72000.00,'4x4','1000',2.50,'Gasolina','Disponible','bannerB.png','bVct.png','veyronF.png','veyronT.png','veyronAerea.png','veyronC1.png','veyronC2.png','veyronC3.png','veyronC4.png','veyronC5.png','',2),('Bugatti Chiron','Autom�vil deportivo de alta gama fabricado por Bugatti. Es el sucesor del Bugatti Veyron y uno de los coches m�s r�pidos del mundo.','Dise�o elegante y deportivo con l�neas curvas y suaves que asemejan a un tibur�n. Faros LED y parrilla ic�nicos de Bugatti.','Motor de 8.0 litros W16 con cuatro turbocompresores que produce 1500 caballos de fuerza y 1600 Nm de torque. Transmisi�n autom�tica de 7 velocidades. Tracci�n en las cuatro ruedas.','Gris',2,420.00,'Autom�tico',25000.00,150000.00,'4x4','1500',2.40,'Gasolina','Disponible','bannerB.png','bCct.png','chironF.png','chironT.png','chironAerea.png','chironC1.png','chironC2.png','chironC3.png','chironC4.png','chironC5.png','',2),('Bugatti W16 Mistral','Concept car deportivo de alta gama fabricado por Bugatti. Se present� en 2021 como tributo al Bugatti EB110 de los a�os 90.','Dise�o futurista y agresivo con l�neas aerodin�micas y faros LED integrados. Puertas de tijera caracter�sticas de Bugatti.','Motor de 8.0 litros W16 con cuatro turbocompresores que produce 1600 caballos de fuerza y 1850 Nm de torque. Transmisi�n autom�tica de 7 velocidades. Tracci�n en las cuatro ruedas.','Plata',2,484.00,'Autom�tico',35000.00,210000.00,'4x4','1600',2.40,'Gasolina','Disponible','bannerB.png','bW16ct.png','wF.png','wT.png','wAerea.png','wC1.png','wC2.png','wC3.png','wC4.png','wC5.png','',2),('Bugatti Centodieci','El Bugatti Centodieci es un hypercar de edici�n limitada presentado en 2019. Se fabricaron solo 10 unidades en todo el mundo. Es una versi�n homenaje al legendario Bugatti EB110 de los a�os 90. El Centodieci ofrece un rendimiento excepcional y una experiencia de conducci�n emocionante.','El dise�o del Bugatti Centodieci es una evoluci�n del Chiron. La carrocer�a est� hecha de fibra de carbono y cuenta con l�neas limpias y aerodin�micas que mejoran su rendimiento. La parte trasera del coche cuenta con un aler�n grande y cuatro tubos de escape. Adem�s, el dise�o cuenta con elementos inspirados en el EB110, como las luces traseras y las l�neas del techo.','El Bugatti Centodieci est� equipado con un motor W16 de 8.0 litros que produce una potencia m�xima de 1600 caballos de fuerza y 1600 Nm de torque. La transmisi�n autom�tica de 7 velocidades y la tracci�n en las cuatro ruedas le permiten acelerar de 0 a 100 km/h en 2.4 segundos y alcanzar una velocidad m�xima de 380 km/h.','Blanco',2,380.00,'Autom�tico',25000.00,150000.00,'4x4','1600',2.40,'Gasolina','Disponible','bannerB.png','bg4ct.png','cdF.png','cdT.png','cdAerea.png','cdC1.png','cdC2.png','cdC3.png','cdC4.png','cdC5.png','',2),('Ferrari F8 Spider','El Ferrari F8 Spider es un superdeportivo descapotable de altas prestaciones que combina un dise�o espectacular con una potencia desbordante y un equipamiento tecnol�gico de primer nivel.','El dise�o del Ferrari F8 Spider es una evoluci�n del exitoso 488 Spider, con un aspecto a�n m�s aerodin�mico y agresivo gracias a una serie de mejoras en la carrocer�a y el chasis.','El motor V8 biturbo de 3.9 litros del Ferrari F8 Spider desarrolla una potencia m�xima de 720 CV y un par m�ximo de 770 Nm, lo que le permite acelerar de 0 a 100 km/h en tan solo 2,9 segundos y alcanzar una velocidad m�xima de 340 km/h.','Rojo corsa',2,340.00,'doble embrague de 7 velocidades',1800.00,12600.00,'tracci�n trasera','720',2.90,'Gasolina','Disponible','bannerF.png','fsCt.png','fsF.png','fsT.png','fVa.png','fsC1.png','fsC2.png','fsC3.png','fsC4.png','fsC5.png','',3),('Ferrari 488 Pista','El Ferrari 488 Pista es un superdeportivo de altas prestaciones que combina una aerodin�mica avanzada con una potencia desbordante y una tecnolog�a de �ltima generaci�n.','El dise�o del Ferrari 488 Pista es una evoluci�n del exitoso 488 GTB, con una carrocer�a m�s agresiva y una serie de mejoras en el chasis para lograr un rendimiento todav�a mayor.','El motor V8 biturbo de 3.9 litros del Ferrari 488 Pista desarrolla una potencia m�xima de 720 CV y un par m�ximo de 770 Nm, lo que le permite acelerar de 0 a 100 km/h en tan solo 2,85 segundos y alcanzar una velocidad m�xima de 340 km/h.','Rojo corsa',2,340.00,'doble embrague de 7 velocidades',1900.00,13300.00,'tracci�n trasera','720',2.85,'Gasolina','Disponible','bannerF.png','f488C.png','f488F.png','f488T.png','f488Va.png','f488C1.png','f488C2.png','f488C3.png','f488C4.png','f488C5.png','',3),('Ferrari F430','El Ferrari F430 es un autom�vil deportivo de motor central producido por el fabricante italiano Ferrari desde 2004 hasta 2009. Fue presentado en el Sal�n del Autom�vil de Par�s de 2004 para reemplazar al Ferrari 360. El F430 cuenta con un motor V8 de 4.3 litros con 490 caballos de fuerza.','El dise�o del Ferrari F430 fue desarrollado por Pininfarina en colaboraci�n con el equipo de dise�o de Ferrari. Su dise�o se inspira en la tecnolog�a de la F�rmula 1, con una carrocer�a aerodin�mica y elegante que se adapta a altas velocidades.','El Ferrari F430 cuenta con un motor V8 de 4.3 litros que produce una potencia m�xima de 490 caballos de fuerza a 8500 rpm. El motor est� acoplado a una transmisi�n manual de seis velocidades o una transmisi�n secuencial F1 de seis velocidades.','Rojo',2,315.00,'Manual',1000.00,6000.00,'Manual de 6 velocidades','490',4.00,'Gasolina','Disponible','bannerF.png','f430Ct.png','f430F.png','f430T.png','f430Vaerea.png','f430C1.png','f430C2.png','f430C3.png','f430C4.png','f430C5.png','',3),('Ferrari Portofino','El Ferrari Portofino es un autom�vil deportivo producido por el fabricante italiano Ferrari desde 2017. Fue presentado en el Sal�n del Autom�vil de Frankfurt de 2017 como reemplazo del Ferrari California T. El Portofino cuenta con un motor V8 de 3.9 litros con 591 caballos de fuerza.','El dise�o del Ferrari Portofino fue desarrollado por el equipo de dise�o interno de Ferrari. El Portofino presenta una carrocer�a elegante y aerodin�mica que se adapta a altas velocidades y cuenta con un techo r�gido retr�ctil.','El Ferrari Portofino cuenta con un motor V8 de 3.9 litros que produce una potencia m�xima de 591 caballos de fuerza a 7500 rpm. El motor est� acoplado a una transmisi�n autom�tica de doble embrague de siete velocidades.','Rojo',2,320.00,'Autom�tico',1500.00,9000.00,'Transmisi�n autom�tica de doble embrague','591',3.50,'Gasolina','Disponible','bannerF.png','fpC.png','fpF.png','fpT.png','fpVaerea.png','fpC1.png','fpC2.png','fpC3.png','fpC4.png','fpC5.png','',3),('Koenigsegg Jesko Absolut','El Koenigsegg Jesko Absolut es uno de los coches m�s veloces del mundo, con una velocidad m�xima de m�s de 500 km/h. Este superdeportivo cuenta con un motor V8 de 5.0 litros de capacidad y dos turbocompresores, lo que le permite producir 1.600 CV de potencia m�xima.','El dise�o del Jesko Absolut es impresionante. Cada parte del coche ha sido dise�ada para mejorar la aerodin�mica y la estabilidad a altas velocidades. Destacan las enormes tomas de aire laterales y la parte trasera con un enorme aler�n.','El motor del Jesko Absolut es el mismo que el del Jesko normal, un V8 biturbo de 5.0 litros capaz de producir 1.600 CV de potencia m�xima y un par motor m�ximo de 1.500 Nm.','Blanco',2,532.00,'Secuencial',6000.00,42000.00,'Doble embrague','1600',2.50,'Gasolina','Disponible','bannerK.png','Koenigsegg_Jesko_Absolut1.jpg','Koegnigsegg_Jesko_Absolut2.png','Koegnigsegg_Jesko_Absolut3.png','Koenigsegg_Jesko_Absolut4.png','Koenigsegg_Jesko_Absolut5.jpg','Koenigsegg_Jesko_Absolut6.jpg','Koenigsegg_Jesko_Absolut7.jpg','Koenigsegg_Jesko_Absolut8.jpg','','',4),('Koenigsegg CC850','El Koenigsegg CC850 es un superdeportivo exclusivo que ofrece un rendimiento espectacular. Este coche cuenta con un motor V8 de 4.7 litros con doble turbo que produce una potencia m�xima de 850 CV. Adem�s, est� construido con materiales ligeros para mejorar su relaci�n peso-potencia.','El dise�o del Koenigsegg CC850 es elegante y aerodin�mico. La carrocer�a est� dise�ada para generar la menor resistencia al aire posible, lo que contribuye a su impresionante velocidad m�xima.','El motor del Koenigsegg CC850 es un V8 de 4.7 litros con doble turbo que produce una potencia m�xima de 850 CV y un par motor m�ximo de 920 Nm.','Rojo',2,410.00,'Manual',5500.00,35000.00,'Manual','850',3.20,'Gasolina','Disponible','bannerK.png','Koegnigsegg_CC850_1.jpg','Koegnigsegg_CC850_2.png','Koegnigsegg_CC850_3.png','Koegnigsegg_CC850_4.png','Koegnigsegg_CC850_5.jpg','Koegnigsegg_CC850_6.jpg','Koegnigsegg_CC850_7.jpg','Koegnigsegg_CC850_8.jpg','','',4),('Koenigsegg Gemera','El Koenigsegg Gemera es un autom�vil h�brido enchufable de cuatro plazas presentado en 2020. Es el primer autom�vil de producci�n en serie de Koenigsegg que tiene cuatro plazas y las puertas de estilo de ala de gaviota son operadas el�ctricamente.','El dise�o exterior del Gemera es distintivo con sus l�neas suaves y el conjunto de faros delanteros, que parecen m�s peque�os de lo habitual en Koenigsegg. Adem�s, cuenta con un interior lujoso y espacioso, con pantallas t�ctiles para cada pasajero y un sistema de sonido de 11 altavoces.','El motor del Gemera es un sistema h�brido de tres motores, que incluye un motor de combusti�n interna V8 biturbo de 2,0 litros y dos motores el�ctricos. La potencia total del sistema es de 1.700 CV, lo que le permite acelerar de 0 a 100 km/h en 1,9 segundos y alcanzar una velocidad m�xima de 400 km/h.','Rojo',4,400.00,'Autom�tico',3000.00,21000.00,'Autom�tica de 9 velocidades','1700',1.90,'Gasolina, el�ctrico','Disponible','bannerK.png','Koegnigsegg_Gemera1.jpg','Koegnigsegg_Gemera2.png','Koegnigsegg_Gemera3.png','Koegnigsegg_Gemera4.png','Koegnigsegg_Gemera5.jpg','Koegnigsegg_Gemera6.jpg','Koegnigsegg_Gemera7.jpg','Koegnigsegg_Gemera8.jpg','','',4),('Koenigsegg Regera','El Koenigsegg Regera es un h�brido enchufable de altas prestaciones que utiliza tecnolog�a avanzada para proporcionar una experiencia de conducci�n �nica. Fue presentado en 2015 en el Sal�n del Autom�vil de Ginebra.','El dise�o del Regera es elegante y aerodin�mico, con una carrocer�a de fibra de carbono y una puerta de estilo de ala de gaviota. El interior cuenta con acabados de alta calidad y tecnolog�a avanzada, como una pantalla t�ctil central de 9 pulgadas y un sistema de sonido de alta fidelidad.','El motor del Regera es un sistema h�brido de tres motores, que incluye un motor de combusti�n interna V8 biturbo de 5.0 litros y dos motores el�ctricos. La potencia total del sistema es de 1.500 CV, lo que le permite acelerar de 0 a 100 km/h en menos de 2,8 segundos y alcanzar una velocidad m�xima de m�s de 400 km/h.','Plata',2,410.00,'Autom�tico',3500.00,24500.00,'Autom�tica de 7 velocidades','1500',2.80,'Gasolina, el�ctrico','Disponible','bannerK.png','Koenigsegg_Regera1.jpg','Koegnisegg-Regera2.png','Koegnigsegg-Regera3.png','Koegnigsegg_Regera4.png','Koenigsegg_Regera5.jpg','Koenigsegg_Regera6.jpg','Koenigsegg_Regera7.jpg','Koenigsegg_Regera8.png','','',4);


CREATE TABLE reservas (
  id_reserva int NOT NULL IDENTITY(1,1),
  id_coche int NOT NULL,
  email nvarchar(100) NULL,
  fecha_inicio date NULL,
  fecha_fin date NULL,
  precio_total decimal(10,2) NULL,
  direccion_entrega nvarchar(100) NULL,
  PRIMARY KEY (id_reserva),
  FOREIGN KEY (id_coche) REFERENCES coches (id_coche)
);

INSERT INTO reservas VALUES (10,'c@gmail.com','2024-05-16','2024-05-17',1900.00,NULL);

CREATE TABLE usuariosX (
  id_usuario int NOT NULL IDENTITY(1,1),
  nombre nvarchar(100) NOT NULL,
  email nvarchar(100) NOT NULL,
  password nvarchar(100) NOT NULL,
  PRIMARY KEY (id_usuario)
);
INSERT INTO usuariosX VALUES ('Cristopher','c@gmail.com','123');

CREATE TABLE tarjetas (
  id_tarjeta int NOT NULL IDENTITY(1,1),
  numero_tarjeta nvarchar(20) NOT NULL,
  nombre_titular nvarchar(100) NOT NULL,
  fecha_expiracion date NOT NULL,
  cvv nvarchar(4) NOT NULL,
  PRIMARY KEY (id_tarjeta)
);


CREATE TABLE tarjetas_usuarios (
  id_tarjeta_usuario int NOT NULL IDENTITY(1,1),
  id_tarjeta int NOT NULL,
  id_usuario int NOT NULL,
  PRIMARY KEY (id_tarjeta_usuario),
  FOREIGN KEY (id_tarjeta) REFERENCES tarjetas(id_tarjeta),
  FOREIGN KEY (id_usuario) REFERENCES usuariosX(id_usuario)
);
