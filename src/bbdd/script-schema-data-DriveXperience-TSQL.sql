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
('Lamborghini', 'Lamborghini es una marca italiana de automóviles de lujo fundada en 1963. Sus vehículos se caracterizan por su diseño futurista y su desempeño deportivo excepcional.', 'lamborghini_logo.png'),
('Bugatti', 'Bugatti es una marca francesa de automóviles de lujo fundada en 1909. Sus vehículos se destacan por su diseño aerodinámico y su desempeño excepcional, y son algunos de los autos más exclusivos y costosos del mundo.', 'bugatti_logo.png'),
('Ferrari', 'Ferrari es una marca italiana de automóviles de lujo fundada en 1947. Sus vehículos se caracterizan por su diseño elegante y deportivo, su desempeño excepcional y su rica historia en el automovilismo.', 'ferrari_logo.png'),
('Koenigsegg', 'Koenigsegg es una marca sueca de automóviles de lujo fundada en 1994. Sus vehículos se caracterizan por su diseño futurista y su desempeño excepcional, y son algunos de los autos más exclusivos y avanzados tecnológicamente del mundo.', 'koenigsegg_logo.png');



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
INSERT INTO coches VALUES ('Lamborghini Huracán','Automóvil deportivo de lujo fabricado por Lamborghini. Reemplazó al Gallardo en 2014 y es considerado uno de los mejores superdeportivos de su segmento.','Diseño agresivo y elegante con líneas futuristas y una imagen clásica de Lamborghini. Faros LED y parrilla hexagonal icónicos.','Motor de 5.2 litros V10 con 640 caballos de fuerza y 600 Nm de torque. Transmisión automática de 7 velocidades. Tracción en las cuatro ruedas.','Rojo',2,325.00,'Automático',1000.00,6000.00,'4x4','640',2.90,'Gasolina','Disponible','bannerLm.png','lamHct.png','huracanF.png','huracanT.png','huracanAereo.png','huracanC1.png','huracanC2.png','huracanC3.png','huracanC4.png','huracanC5.png','',1),('Lamborghini Urus','SUV deportivo de lujo fabricado por Lamborghini. Primer SUV producido por la marca desde el LM002 en la década de 1980.','Diseño agresivo y elegante que combina la forma de un SUV con la deportividad típica de Lamborghini. Parrilla hexagonal icónica.','Motor de 4.0 litros V8 biturbo con 650 caballos de fuerza y 850 Nm de torque. Transmisión automática de 8 velocidades. Tracción en las cuatro ruedas.','Negro',5,305.00,'Automático',1500.00,9000.00,'4x4','650',3.60,'Gasolina','Disponible','bannerLm.png','lamUct.png','urusF.png','urusT.png','UrusAerea.png','urusC1.png','urusC2.png','urusC3.png','urusC4.png','urusC5.png','',1),('Lamborghini Aventador','Automóvil deportivo de lujo fabricado por Lamborghini. Presentado en 2011 como sucesor del Murciélago.','Diseño futurista y agresivo con líneas aerodinámicas y faros LED. Puertas de tijera características de Lamborghini.','Motor de 6.5 litros V12 con 700 caballos de fuerza y 690 Nm de torque. Transmisión automática de 7 velocidades. Tracción en las cuatro ruedas.','Amarillo',2,350.00,'Automático',2000.00,12000.00,'4x4','700',2.90,'Gasolina','Disponible','bannerLm.png','lamAvct.png','aventadorF.png','aventadorT.png','aventadorAer.png','aventadorC1.jpg','aventadorC2.png','aventadorC3.png','aventadorC4.png','aventadorC5.png','',1),('Lamborghini Veneno','El Lamborghini Veneno es un hypercar de edición limitada presentado en 2013 para conmemorar el 50 aniversario de Lamborghini. Solo se produjeron 3 unidades, todas vendidas antes de su presentación oficial. El Veneno es uno de los coches más raros y exclusivos del mundo, y ofrece un rendimiento excepcional y una experiencia de conducción emocionante.','El diseño del Lamborghini Veneno es una evolución de los modelos de Lamborghini de la época, con líneas agresivas y aerodinámicas que mejoran su rendimiento. La carrocería está hecha de fibra de carbono y cuenta con un gran alerón trasero y difusor trasero para mejorar la estabilidad y el agarre. Además, cuenta con detalles en rojo que destacan en contraste con el color negro mate de la carrocería.','El Lamborghini Veneno está equipado con un motor V12 de 6.5 litros que produce una potencia máxima de 750 caballos de fuerza y 690 Nm de torque. La transmisión automática de 7 velocidades y la tracción en las cuatro ruedas le permiten acelerar de 0 a 100 km/h en 2.8 segundos y alcanzar una velocidad máxima de 355 km/h.','Negro mate',2,355.00,'Automático',12000.00,72000.00,'4x4','750',2.80,'Gasolina','Disponible','bannerLm.png','lamVct.png','venenoF.png','venenoT.png','venenoAerea.png','venenoC1.png','venenoC2.png','venenoC3.png','venenoC4.png','venenoC5.png','',1),('Bugatti Veyron','Automóvil deportivo de alta gama fabricado por Bugatti. Fue el coche más rápido del mundo en su época.','Diseño elegante y aerodinámico con líneas curvas y suaves. Faros LED y parrilla icónicos de Bugatti.','Motor de 8.0 litros W16 con cuatro turbocompresores que produce 1000 caballos de fuerza y 1250 Nm de torque. Transmisión automática de 7 velocidades. Tracción en las cuatro ruedas.','Azul',2,407.00,'Automático',12000.00,72000.00,'4x4','1000',2.50,'Gasolina','Disponible','bannerB.png','bVct.png','veyronF.png','veyronT.png','veyronAerea.png','veyronC1.png','veyronC2.png','veyronC3.png','veyronC4.png','veyronC5.png','',2),('Bugatti Chiron','Automóvil deportivo de alta gama fabricado por Bugatti. Es el sucesor del Bugatti Veyron y uno de los coches más rápidos del mundo.','Diseño elegante y deportivo con líneas curvas y suaves que asemejan a un tiburón. Faros LED y parrilla icónicos de Bugatti.','Motor de 8.0 litros W16 con cuatro turbocompresores que produce 1500 caballos de fuerza y 1600 Nm de torque. Transmisión automática de 7 velocidades. Tracción en las cuatro ruedas.','Gris',2,420.00,'Automático',25000.00,150000.00,'4x4','1500',2.40,'Gasolina','Disponible','bannerB.png','bCct.png','chironF.png','chironT.png','chironAerea.png','chironC1.png','chironC2.png','chironC3.png','chironC4.png','chironC5.png','',2),('Bugatti W16 Mistral','Concept car deportivo de alta gama fabricado por Bugatti. Se presentó en 2021 como tributo al Bugatti EB110 de los años 90.','Diseño futurista y agresivo con líneas aerodinámicas y faros LED integrados. Puertas de tijera características de Bugatti.','Motor de 8.0 litros W16 con cuatro turbocompresores que produce 1600 caballos de fuerza y 1850 Nm de torque. Transmisión automática de 7 velocidades. Tracción en las cuatro ruedas.','Plata',2,484.00,'Automático',35000.00,210000.00,'4x4','1600',2.40,'Gasolina','Disponible','bannerB.png','bW16ct.png','wF.png','wT.png','wAerea.png','wC1.png','wC2.png','wC3.png','wC4.png','wC5.png','',2),('Bugatti Centodieci','El Bugatti Centodieci es un hypercar de edición limitada presentado en 2019. Se fabricaron solo 10 unidades en todo el mundo. Es una versión homenaje al legendario Bugatti EB110 de los años 90. El Centodieci ofrece un rendimiento excepcional y una experiencia de conducción emocionante.','El diseño del Bugatti Centodieci es una evolución del Chiron. La carrocería está hecha de fibra de carbono y cuenta con líneas limpias y aerodinámicas que mejoran su rendimiento. La parte trasera del coche cuenta con un alerón grande y cuatro tubos de escape. Además, el diseño cuenta con elementos inspirados en el EB110, como las luces traseras y las líneas del techo.','El Bugatti Centodieci está equipado con un motor W16 de 8.0 litros que produce una potencia máxima de 1600 caballos de fuerza y 1600 Nm de torque. La transmisión automática de 7 velocidades y la tracción en las cuatro ruedas le permiten acelerar de 0 a 100 km/h en 2.4 segundos y alcanzar una velocidad máxima de 380 km/h.','Blanco',2,380.00,'Automático',25000.00,150000.00,'4x4','1600',2.40,'Gasolina','Disponible','bannerB.png','bg4ct.png','cdF.png','cdT.png','cdAerea.png','cdC1.png','cdC2.png','cdC3.png','cdC4.png','cdC5.png','',2),('Ferrari F8 Spider','El Ferrari F8 Spider es un superdeportivo descapotable de altas prestaciones que combina un diseño espectacular con una potencia desbordante y un equipamiento tecnológico de primer nivel.','El diseño del Ferrari F8 Spider es una evolución del exitoso 488 Spider, con un aspecto aún más aerodinámico y agresivo gracias a una serie de mejoras en la carrocería y el chasis.','El motor V8 biturbo de 3.9 litros del Ferrari F8 Spider desarrolla una potencia máxima de 720 CV y un par máximo de 770 Nm, lo que le permite acelerar de 0 a 100 km/h en tan solo 2,9 segundos y alcanzar una velocidad máxima de 340 km/h.','Rojo corsa',2,340.00,'doble embrague de 7 velocidades',1800.00,12600.00,'tracción trasera','720',2.90,'Gasolina','Disponible','bannerF.png','fsCt.png','fsF.png','fsT.png','fVa.png','fsC1.png','fsC2.png','fsC3.png','fsC4.png','fsC5.png','',3),('Ferrari 488 Pista','El Ferrari 488 Pista es un superdeportivo de altas prestaciones que combina una aerodinámica avanzada con una potencia desbordante y una tecnología de última generación.','El diseño del Ferrari 488 Pista es una evolución del exitoso 488 GTB, con una carrocería más agresiva y una serie de mejoras en el chasis para lograr un rendimiento todavía mayor.','El motor V8 biturbo de 3.9 litros del Ferrari 488 Pista desarrolla una potencia máxima de 720 CV y un par máximo de 770 Nm, lo que le permite acelerar de 0 a 100 km/h en tan solo 2,85 segundos y alcanzar una velocidad máxima de 340 km/h.','Rojo corsa',2,340.00,'doble embrague de 7 velocidades',1900.00,13300.00,'tracción trasera','720',2.85,'Gasolina','Disponible','bannerF.png','f488C.png','f488F.png','f488T.png','f488Va.png','f488C1.png','f488C2.png','f488C3.png','f488C4.png','f488C5.png','',3),('Ferrari F430','El Ferrari F430 es un automóvil deportivo de motor central producido por el fabricante italiano Ferrari desde 2004 hasta 2009. Fue presentado en el Salón del Automóvil de París de 2004 para reemplazar al Ferrari 360. El F430 cuenta con un motor V8 de 4.3 litros con 490 caballos de fuerza.','El diseño del Ferrari F430 fue desarrollado por Pininfarina en colaboración con el equipo de diseño de Ferrari. Su diseño se inspira en la tecnología de la Fórmula 1, con una carrocería aerodinámica y elegante que se adapta a altas velocidades.','El Ferrari F430 cuenta con un motor V8 de 4.3 litros que produce una potencia máxima de 490 caballos de fuerza a 8500 rpm. El motor está acoplado a una transmisión manual de seis velocidades o una transmisión secuencial F1 de seis velocidades.','Rojo',2,315.00,'Manual',1000.00,6000.00,'Manual de 6 velocidades','490',4.00,'Gasolina','Disponible','bannerF.png','f430Ct.png','f430F.png','f430T.png','f430Vaerea.png','f430C1.png','f430C2.png','f430C3.png','f430C4.png','f430C5.png','',3),('Ferrari Portofino','El Ferrari Portofino es un automóvil deportivo producido por el fabricante italiano Ferrari desde 2017. Fue presentado en el Salón del Automóvil de Frankfurt de 2017 como reemplazo del Ferrari California T. El Portofino cuenta con un motor V8 de 3.9 litros con 591 caballos de fuerza.','El diseño del Ferrari Portofino fue desarrollado por el equipo de diseño interno de Ferrari. El Portofino presenta una carrocería elegante y aerodinámica que se adapta a altas velocidades y cuenta con un techo rígido retráctil.','El Ferrari Portofino cuenta con un motor V8 de 3.9 litros que produce una potencia máxima de 591 caballos de fuerza a 7500 rpm. El motor está acoplado a una transmisión automática de doble embrague de siete velocidades.','Rojo',2,320.00,'Automático',1500.00,9000.00,'Transmisión automática de doble embrague','591',3.50,'Gasolina','Disponible','bannerF.png','fpC.png','fpF.png','fpT.png','fpVaerea.png','fpC1.png','fpC2.png','fpC3.png','fpC4.png','fpC5.png','',3),('Koenigsegg Jesko Absolut','El Koenigsegg Jesko Absolut es uno de los coches más veloces del mundo, con una velocidad máxima de más de 500 km/h. Este superdeportivo cuenta con un motor V8 de 5.0 litros de capacidad y dos turbocompresores, lo que le permite producir 1.600 CV de potencia máxima.','El diseño del Jesko Absolut es impresionante. Cada parte del coche ha sido diseñada para mejorar la aerodinámica y la estabilidad a altas velocidades. Destacan las enormes tomas de aire laterales y la parte trasera con un enorme alerón.','El motor del Jesko Absolut es el mismo que el del Jesko normal, un V8 biturbo de 5.0 litros capaz de producir 1.600 CV de potencia máxima y un par motor máximo de 1.500 Nm.','Blanco',2,532.00,'Secuencial',6000.00,42000.00,'Doble embrague','1600',2.50,'Gasolina','Disponible','bannerK.png','Koenigsegg_Jesko_Absolut1.jpg','Koegnigsegg_Jesko_Absolut2.png','Koegnigsegg_Jesko_Absolut3.png','Koenigsegg_Jesko_Absolut4.png','Koenigsegg_Jesko_Absolut5.jpg','Koenigsegg_Jesko_Absolut6.jpg','Koenigsegg_Jesko_Absolut7.jpg','Koenigsegg_Jesko_Absolut8.jpg','','',4),('Koenigsegg CC850','El Koenigsegg CC850 es un superdeportivo exclusivo que ofrece un rendimiento espectacular. Este coche cuenta con un motor V8 de 4.7 litros con doble turbo que produce una potencia máxima de 850 CV. Además, está construido con materiales ligeros para mejorar su relación peso-potencia.','El diseño del Koenigsegg CC850 es elegante y aerodinámico. La carrocería está diseñada para generar la menor resistencia al aire posible, lo que contribuye a su impresionante velocidad máxima.','El motor del Koenigsegg CC850 es un V8 de 4.7 litros con doble turbo que produce una potencia máxima de 850 CV y un par motor máximo de 920 Nm.','Rojo',2,410.00,'Manual',5500.00,35000.00,'Manual','850',3.20,'Gasolina','Disponible','bannerK.png','Koegnigsegg_CC850_1.jpg','Koegnigsegg_CC850_2.png','Koegnigsegg_CC850_3.png','Koegnigsegg_CC850_4.png','Koegnigsegg_CC850_5.jpg','Koegnigsegg_CC850_6.jpg','Koegnigsegg_CC850_7.jpg','Koegnigsegg_CC850_8.jpg','','',4),('Koenigsegg Gemera','El Koenigsegg Gemera es un automóvil híbrido enchufable de cuatro plazas presentado en 2020. Es el primer automóvil de producción en serie de Koenigsegg que tiene cuatro plazas y las puertas de estilo de ala de gaviota son operadas eléctricamente.','El diseño exterior del Gemera es distintivo con sus líneas suaves y el conjunto de faros delanteros, que parecen más pequeños de lo habitual en Koenigsegg. Además, cuenta con un interior lujoso y espacioso, con pantallas táctiles para cada pasajero y un sistema de sonido de 11 altavoces.','El motor del Gemera es un sistema híbrido de tres motores, que incluye un motor de combustión interna V8 biturbo de 2,0 litros y dos motores eléctricos. La potencia total del sistema es de 1.700 CV, lo que le permite acelerar de 0 a 100 km/h en 1,9 segundos y alcanzar una velocidad máxima de 400 km/h.','Rojo',4,400.00,'Automático',3000.00,21000.00,'Automática de 9 velocidades','1700',1.90,'Gasolina, eléctrico','Disponible','bannerK.png','Koegnigsegg_Gemera1.jpg','Koegnigsegg_Gemera2.png','Koegnigsegg_Gemera3.png','Koegnigsegg_Gemera4.png','Koegnigsegg_Gemera5.jpg','Koegnigsegg_Gemera6.jpg','Koegnigsegg_Gemera7.jpg','Koegnigsegg_Gemera8.jpg','','',4),('Koenigsegg Regera','El Koenigsegg Regera es un híbrido enchufable de altas prestaciones que utiliza tecnología avanzada para proporcionar una experiencia de conducción única. Fue presentado en 2015 en el Salón del Automóvil de Ginebra.','El diseño del Regera es elegante y aerodinámico, con una carrocería de fibra de carbono y una puerta de estilo de ala de gaviota. El interior cuenta con acabados de alta calidad y tecnología avanzada, como una pantalla táctil central de 9 pulgadas y un sistema de sonido de alta fidelidad.','El motor del Regera es un sistema híbrido de tres motores, que incluye un motor de combustión interna V8 biturbo de 5.0 litros y dos motores eléctricos. La potencia total del sistema es de 1.500 CV, lo que le permite acelerar de 0 a 100 km/h en menos de 2,8 segundos y alcanzar una velocidad máxima de más de 400 km/h.','Plata',2,410.00,'Automático',3500.00,24500.00,'Automática de 7 velocidades','1500',2.80,'Gasolina, eléctrico','Disponible','bannerK.png','Koenigsegg_Regera1.jpg','Koegnisegg-Regera2.png','Koegnigsegg-Regera3.png','Koegnigsegg_Regera4.png','Koenigsegg_Regera5.jpg','Koenigsegg_Regera6.jpg','Koenigsegg_Regera7.jpg','Koenigsegg_Regera8.png','','',4);


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
