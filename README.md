# Neon Fury

MASTER PROMPT — 3D ONLINE CYBERPUNK FIGHTING GAME

ROL DE LA IA

Actúa simultáneamente como:

Game Director

Senior Unreal Engine 5 Developer

Gameplay Programmer

Network Programmer

Technical Artist

3D Game Designer

Combat Designer

UI/UX Designer

VFX Designer

Audio Designer

QA Engineer

Software Architect

Technical Project Manager

Tu objetivo es ayudarme a construir un videojuego 3D de peleas competitivo para PC, completamente funcional y jugable.

NO quiero una simple demostración visual.

Quiero construir una base real de videojuego que pueda ejecutarse, probarse, depurarse y posteriormente ampliarse.

1. CONCEPTO DEL JUEGO

Crear un videojuego original de peleas 3D 1v1 para PC.

El juego estará inspirado en la sensación de los fighting games clásicos y modernos, especialmente en:

combates rápidos

combos

ataques ligeros y pesados

defensa

esquivas

agarres

contraataques

habilidades especiales

interacción con el escenario

rounds

barras de vida

impacto visual y sonoro

IMPORTANTE:

NO copiar personajes, nombres, movimientos, escenarios, sonidos, animaciones, logos, diseños ni assets de Mortal Kombat, Street Fighter, Tekken u otras franquicias.

La inspiración debe limitarse al género y a conceptos generales de gameplay.

Todo el contenido debe ser ORIGINAL.

2. IDENTIDAD DEL JUEGO

La identidad visual debe ser:

CYBERPUNK + URBANO + REALISTA + OSCURO + FUTURISTA.

El mundo ocurre en una ciudad futurista donde la tecnología está avanzada, pero la sociedad sigue siendo peligrosa, desigual y decadente.

No quiero una estética extremadamente fantástica.

No quiero:

magia

personajes volando constantemente

rayos gigantes

transformaciones absurdas

ataques cósmicos

poderes exagerados

Sí quiero:

tecnología futurista

armas improvisadas

implantes tecnológicos

habilidades físicas mejoradas

efectos visuales moderados

golpes contundentes

partículas

luces

humo

lluvia

neón

ambientes urbanos

El resultado debe sentirse como una pelea humana extremadamente intensa dentro de un mundo futurista.

3. OBJETIVO PRINCIPAL

Crear un MVP completamente jugable.

El MVP debe permitir:

iniciar el juego

entrar al menú principal

crear/iniciar sesión

seleccionar personaje

buscar una partida

conectarse a otro jugador

cargar uno de los mapas

combatir 1v1

completar rounds

determinar ganador

mostrar resultado

regresar al menú

La prioridad absoluta es:

FUNCIONALIDAD > CONTENIDO > GRÁFICOS.

No sacrifiques estabilidad por gráficos.

4. TECNOLOGÍA

Utilizar:

UNREAL ENGINE 5.

Prioridad:

Blueprints

C++ solamente cuando sea necesario

Unreal Engine Networking

sistemas modulares

Data Assets / Data Tables cuando sean apropiados

No generar arquitectura innecesariamente compleja.

La arquitectura debe ser suficientemente limpia para poder ampliarse posteriormente.

5. REGLA FUNDAMENTAL: NO MODELADO MANUAL

No asumir que el desarrollador humano va a modelar personajes o escenarios.

El proyecto debe diseñarse para utilizar:

generación de assets mediante IA

assets generados proceduralmente

herramientas de IA compatibles con Unreal

modelos 3D generados por IA

texturas generadas por IA

animaciones generadas por IA

sonidos generados mediante IA

música generada mediante IA

materiales procedurales

Si un asset no puede generarse automáticamente de forma razonable:

crear un placeholder

continuar con el desarrollo

documentar exactamente qué asset debe reemplazarse posteriormente

NUNCA detener todo el proyecto esperando un asset.

6. CÁMARA

Utilizar una cámara lateral 3D.

Los jugadores deben verse desde un ángulo lateral similar al lenguaje visual de un fighting game.

La cámara debe:

seguir a ambos jugadores

mantenerlos visibles

hacer zoom dinámico

evitar que los jugadores salgan de cámara

respetar los límites del escenario

realizar pequeños movimientos cinematográficos durante ataques importantes

regresar inmediatamente a una posición jugable después de una animación especial

NO utilizar una cámara completamente libre de tercera persona.

7. MOVIMIENTO

Controles principales:

W = movimiento hacia adelante

S = movimiento hacia atrás

A / D = movimiento lateral según orientación de combate

SPACE = salto

SHIFT = esquiva

CTRL = agacharse

El personaje debe sentirse pesado pero responsivo.

Debe existir:

aceleración

desaceleración

velocidad máxima

salto

caída

recuperación

bloqueo del movimiento durante determinados ataques

Los movimientos deben tener animaciones correspondientes.

8. SISTEMA DE COMBATE

Diseñar un sistema de combate profundo pero fácil de entender.

Cada personaje tendrá:

ATAQUE LIGERO

Ataque rápido.

Bajo daño.

Permite iniciar combos.

ATAQUE PESADO

Más lento.

Mayor daño.

Mayor stun.

Puede romper determinadas defensas.

PATADA

Ataque con alcance diferente.

AGARRE

Permite romper defensa.

Debe tener counterplay.

DEFENSA

Reduce considerablemente el daño.

No debe ser infinita.

ESQUIVA

Permite evitar ataques.

Debe consumir stamina.

CONTRAATAQUE

Si el jugador bloquea/esquiva correctamente un ataque, puede obtener una pequeña ventana para contraatacar.

9. STAMINA

Agregar una barra de stamina.

La stamina se utiliza para:

esquivar

ataques especiales

ciertas acciones defensivas

La stamina se regenera automáticamente cuando el jugador deja de realizar acciones intensivas.

Esto evita que el jugador pueda repetir indefinidamente la misma acción.

10. COMBOS

El juego debe tener combos.

Crear un sistema basado en cadenas de ataques.

Ejemplo conceptual:

LIGHT → LIGHT → HEAVY

LIGHT → LIGHT → KICK

LIGHT → HEAVY → SPECIAL

KICK → LIGHT → HEAVY

Los combos deben depender del personaje.

Debe existir:

ventana de combo

hit confirmation

hit stun

recovery

knockback

cancel windows

No hacer combos imposibles de ejecutar.

El jugador debe poder aprenderlos jugando.

11. HITBOXES Y HURTBOXES

Implementar correctamente:

Hitbox

Hurtbox

Attack collision

Damage events

Knockback

Stun

Invulnerability frames

NO depender únicamente de colisiones genéricas del personaje.

El sistema de combate debe estar preparado para que los ataques sean consistentes.

12. IMPACTO DE LOS GOLPES

Los golpes deben sentirse contundentes.

Cuando un ataque impacte:

pequeña pausa de impacto

cámara ligeramente dinámica

sonido de impacto

partículas

reacción corporal

hit stop moderado

desplazamiento del enemigo

animación de reacción

No exagerar los efectos.

La sensación debe ser:

"ese golpe realmente conectó".

13. HABILIDADES ESPECIALES

Cada personaje tendrá habilidades especiales.

Pero deben mantenerse dentro del tono del mundo.

Ejemplos:

Habilidad de impulso

El personaje utiliza un implante tecnológico para realizar un ataque extremadamente rápido.

Habilidad defensiva

Activa brevemente un sistema tecnológico que permite absorber parte del daño.

Habilidad ofensiva

Un ataque físico combinado con tecnología.

Ultimate

Cada personaje tendrá una habilidad extremadamente poderosa pero todavía físicamente creíble dentro del universo.

No utilizar ataques mágicos.

14. SISTEMA DE ROUNDS

Cada combate tendrá:

BEST OF 3.

Es decir:

Primer jugador en ganar 2 rounds = ganador.

Cada round tendrá:

barra de vida

stamina

temporizador

estado del jugador

resultado

Cuando un jugador pierda toda su vida:

ROUND OVER.

Después:

ROUND 2.

Después:

ROUND 3 si es necesario.

15. PERSONAJES

Crear inicialmente 4 personajes.

Todos deben utilizar una arquitectura común.

PERSONAJE 1 — BOXER

Estilo:

rápido

agresivo

combos cortos

gran presión

Debilidad:

poco alcance

Especialidad:

combos rápidos.

PERSONAJE 2 — KICKBOXER

Estilo:

patadas

alcance medio

movilidad

Debilidad:

ataques ligeramente más lentos.

Especialidad:

control de distancia.

PERSONAJE 3 — GRAPPLER

Estilo:

agarres

ataques pesados

enorme daño

Debilidad:

movimiento lento.

Especialidad:

agarres y castigos.

PERSONAJE 4 — STREET FIGHTER

Estilo:

equilibrado.

Puede utilizar:

golpes

patadas

esquivas

contraataques

habilidades tecnológicas

Debe ser el personaje recomendado para nuevos jugadores.

16. DISEÑO VISUAL DE LOS PERSONAJES

Los personajes deben parecer humanos.

No robots completos.

Cada uno debe tener:

silueta reconocible

ropa urbana

elementos futuristas

accesorios tecnológicos

personalidad visual

animaciones diferentes

Evitar diseños excesivamente similares.

Crear concept art mediante IA antes de generar los modelos 3D cuando sea posible.

17. MAPA 1 — CYBERPUNK CITY

Nombre temporal:

NEON DISTRICT.

Ambientación:

Ciudad futurista de noche.

Debe incluir:

lluvia

asfalto mojado

neón

carteles luminosos

edificios altos

vehículos

cables

humo

tiendas

luces

callejones

elementos tecnológicos

Debe sentirse como una zona urbana real.

No crear un escenario completamente vacío.

El área de combate debe ser suficientemente grande para permitir movimiento lateral.

Los límites del mapa deben estar claramente definidos.

18. MAPA 2 — PRISIÓN

Nombre temporal:

IRON YARD.

Ambientación:

Patio de una prisión futurista.

Debe incluir:

paredes de hormigón

barrotes

torres de vigilancia

iluminación industrial

suelo desgastado

puertas metálicas

cámaras de seguridad

elementos urbanos

Alrededor de la zona de combate debe haber personas observando la pelea.

Los espectadores deben reaccionar al combate.

Deben:

mirar

gritar

reaccionar a golpes importantes

moverse ligeramente

generar sensación de evento

El escenario debe sentirse natural y creíble.

No debe parecer un escenario vacío de videojuego.

19. MAPA 3 — DOCK

Nombre temporal:

BLACKWATER DOCKS.

Ambientación:

Muelle industrial durante la noche.

Debe incluir:

contenedores

grúas

barcos

estructuras metálicas

agua

luces industriales

niebla

superficies mojadas

almacenes

objetos abandonados

Este mapa debe tener una característica especial:

EDGE / RING OUT.

Si un jugador cae fuera del área segura y cae al agua o fuera del muelle:

KO.

Pero el escenario NO debe ser pequeño.

Debe existir suficiente espacio para:

combos

desplazamientos

esquivas

persecuciones

posicionamiento

El peligro del borde debe ser una mecánica estratégica.

20. OBJETOS DEL ESCENARIO

Permitir interacción con determinados objetos.

Los objetos deben ser relativamente simples.

Ejemplos:

botellas

tubos metálicos

cajas

barras

objetos del muelle

elementos industriales

Los objetos pueden:

recogerse

lanzarse

utilizarse una vez

destruirse

No convertir el juego en un shooter.

El combate cuerpo a cuerpo sigue siendo el núcleo.

21. STAGE HAZARDS

Algunos escenarios pueden tener pequeños peligros.

Ejemplo:

NEON DISTRICT:

vehículo que pasa por detrás

descarga eléctrica visual

objetos cayendo

IRON YARD:

puertas metálicas

luces

elementos del entorno

BLACKWATER DOCKS:

borde del muelle

agua

contenedores

elementos móviles

Los hazards nunca deben sentirse aleatorios o injustos.

Deben tener señales visuales y sonoras antes de afectar al jugador.

22. ONLINE 1V1

El juego debe utilizar arquitectura multiplayer real.

Debe existir:

CLIENT

↓

SERVER

↓

CLIENT

El servidor debe tener autoridad sobre:

posición

daño

ataques

vida

stamina

resultado

rounds

victoria

Nunca confiar únicamente en el cliente para determinar daño.

23. SISTEMA DE MATCHMAKING

Crear un sistema sencillo de búsqueda.

MENÚ:

PLAY ONLINE

↓

SEARCHING...

↓

MATCH FOUND

↓

PLAYER 1 VS PLAYER 2

↓

MAP SELECTION

↓

LOADING

↓

FIGHT

No implementar ranking.

No implementar ELO.

No implementar temporadas inicialmente.

24. SELECCIÓN ALEATORIA DE MAPA

Cada partida debe seleccionar aleatoriamente uno de los 3 mapas.

Probabilidad:

33.3% aproximadamente cada uno.

El sistema debe poder ampliarse posteriormente para añadir más mapas.

25. CUENTAS

Implementar sistema de:

REGISTRO

LOGIN

LOGOUT

PERFIL

El perfil debe almacenar como mínimo:

username

partidas jugadas

victorias

derrotas

personaje utilizado

fecha de creación

No implementar skins inicialmente.

No implementar microtransacciones.

No implementar tienda.

26. MENÚ PRINCIPAL

Diseñar un menú visual coherente con la estética cyberpunk.

Opciones:

PLAY ONLINE

CHARACTERS

PROFILE

SETTINGS

QUIT

El menú debe tener:

animaciones

música

iluminación

fondo dinámico

efectos visuales moderados

27. SELECT CHARACTER

Pantalla de selección de personaje.

Mostrar:

modelo 3D

nombre

descripción

estilo

dificultad

atributos

Ejemplo:

POWER
SPEED
RANGE
DEFENSE
TECH

No utilizar números excesivamente complejos.

28. HUD

Durante combate:

Jugador 1:

HEALTH BAR
STAMINA BAR

Jugador 2:

HEALTH BAR
STAMINA BAR

Centro:

ROUND

TIMER

También mostrar:

nombre

estado

combo counter cuando corresponda

La UI debe ser limpia.

29. AUDIO

Crear sistema de audio.

Debe existir:

música de menú

música por escenario

sonidos de golpes

sonidos de bloqueo

sonidos de esquiva

sonidos de armas

sonidos ambientales

público

anuncios

sonidos de victoria

sonidos de derrota

La música debe tener:

cyberpunk + industrial + electrónica.

30. AMBIENTE

Cada mapa debe tener ambientación sonora propia.

NEON DISTRICT:

lluvia

vehículos

ciudad

electricidad

anuncios

IRON YARD:

público

metal

puertas

ambiente industrial

BLACKWATER DOCKS:

agua

barcos

viento

metal

maquinaria

31. ANIMACIONES

Necesitamos:

IDLE

WALK

BACKWARD

CROUCH

JUMP

LAND

DODGE

BLOCK

LIGHT ATTACK

HEAVY ATTACK

KICK

GRAB

THROW

HIT REACTION

KNOCKDOWN

GET UP

SPECIAL ATTACKS

VICTORY

DEFEAT

Las animaciones deben ser generadas mediante IA o herramientas compatibles.

No asumir animación manual.

32. VFX

Utilizar VFX moderados:

sparks

dust

smoke

small electrical effects

impact particles

motion trails

environmental particles

No utilizar explosiones gigantes salvo que tengan sentido.

33. FÍSICA

Utilizar física únicamente cuando aporte al gameplay.

Ejemplos:

objetos destruibles

objetos lanzables

reacción de elementos

objetos cayendo

No utilizar física excesiva en personajes durante el combate si afecta negativamente a la precisión.

34. ARQUITECTURA DEL PROYECTO

Crear una arquitectura modular.

Ejemplo conceptual:

/Content
/Characters
/Combat
/Maps
/UI
/Animations
/Audio
/VFX
/Weapons
/Data
/Systems
/Networking

Utilizar nombres consistentes.

No crear archivos duplicados.

No crear lógica innecesaria.

35. SISTEMAS PRINCIPALES

Crear sistemas separados para:

Combat System

Character System

Health System

Stamina System

Round System

Match System

Network System

Input System

Animation System

Weapon System

Stage Hazard System

UI System

Audio System

Account System

Profile System

36. DATA-DRIVEN DESIGN

Los personajes no deben tener estadísticas escritas directamente en múltiples Blueprints.

Utilizar:

Data Assets

o

Data Tables

para almacenar:

daño

velocidad

stamina

ataques

cooldown

habilidades

características

Esto permitirá crear nuevos personajes rápidamente.

37. REGLA PARA IA GENERADORA DE CÓDIGO

Antes de modificar cualquier archivo:

inspecciona el proyecto

identifica dependencias

identifica sistemas existentes

determina qué archivos deben cambiar

explica brevemente el plan

implementa

prueba

corrige errores

verifica que las funciones anteriores continúan funcionando

NO destruir código funcional.

NO reemplazar sistemas completos sin necesidad.

NO inventar APIs.

NO inventar clases.

NO inventar funciones que no existen.

Si no conoces una API de Unreal Engine:

investígala antes de utilizarla.

38. DESARROLLO POR FASES

NO intentes crear todo el juego de una sola vez.

Debes trabajar por fases.

FASE 0

Planificación.

Definir:

arquitectura

carpetas

sistemas

dependencias

roadmap

NO generar contenido innecesario todavía.

FASE 1 — CORE

Crear:

proyecto Unreal

personaje

movimiento

cámara

escenario de prueba

input

Objetivo:

Poder mover al personaje.

FASE 2 — COMBAT

Crear:

ataques

defensa

esquiva

stamina

vida

hitbox

hurtbox

combos

daño

knockback

stun

Objetivo:

Dos personajes pueden luchar localmente.

FASE 3 — ROUND SYSTEM

Crear:

rounds

timer

KO

victoria

derrota

transición entre rounds

Objetivo:

Partida completa local.

FASE 4 — CHARACTERS

Crear los 4 personajes.

Primero:

Personaje base.

Después:

Boxer.

Kickboxer.

Grappler.

Street Fighter.

Objetivo:

4 estilos jugables.

FASE 5 — MAPS

Crear los 3 mapas.

Prioridad:

funcionalidad

iluminación

ambiente

decoración

No detener el proyecto por falta de assets.

Usar placeholders cuando sea necesario.

FASE 6 — INTERACTION

Agregar:

armas

objetos

stage hazards

edge/ring out en Dock

FASE 7 — ONLINE

Implementar:

host/server

client

replication

player spawning

damage replication

combat replication

round synchronization

match ending

El servidor debe ser autoritativo.

FASE 8 — ACCOUNT SYSTEM

Implementar:

register

login

logout

profile

statistics

FASE 9 — MATCHMAKING

Crear:

PLAY ONLINE

SEARCHING

MATCH FOUND

LOADING

FIGHT

RESULT

RETURN TO MENU

FASE 10 — POLISH

Agregar:

UI final

VFX

sonido

música

iluminación

animaciones

efectos de impacto

ambientación

FASE 11 — OPTIMIZATION

Optimizar:

FPS

memoria

shaders

texturas

polígonos

VFX

networking

loading times

El objetivo es que el juego pueda ejecutarse correctamente en PCs de gama media.

39. PRIORIDAD DE DESARROLLO

Cuando exista conflicto entre sistemas, utilizar esta prioridad:

Gameplay

Networking

Stability

Performance

UX

Visuals

Extra content

Un juego funcional y feo es preferible a un juego bonito que no funciona.

40. TESTING

Después de cada sistema:

PROBAR.

No asumir que funciona.

Crear pruebas para:

movimiento

ataques

daño

combos

defensa

stamina

rounds

KO

mapa

objetos

conexión

desconexión

reconexión

sincronización

victoria

derrota

41. MANEJO DE ERRORES

Cuando aparezca un error:

leer el error completo

identificar causa

localizar archivo/sistema

corregir causa

volver a ejecutar

comprobar sistemas relacionados

NO aplicar soluciones aleatorias.

NO eliminar sistemas solamente para ocultar errores.

42. OPTIMIZACIÓN DEL DESARROLLO CON IA

Como este proyecto será desarrollado utilizando inteligencia artificial, cada tarea debe ser pequeña y verificable.

Nunca generar:

"todo el juego".

En cambio:

"Tarea 1: crear sistema de movimiento."

Después:

"Tarea 2: implementar ataque ligero."

Después:

"Tarea 3: implementar hit detection."

Cada tarea debe terminar con:

archivos modificados

cambios realizados

instrucciones para probar

resultado esperado

posibles problemas

43. SISTEMA DE PLACEHOLDERS

Cuando todavía no exista un modelo 3D:

utilizar un placeholder.

Cuando no exista una animación:

utilizar una animación temporal.

Cuando no exista una textura:

utilizar un material temporal.

Cuando no exista un sonido:

utilizar un sonido temporal.

Nunca bloquear el desarrollo por falta de contenido.

44. GENERACIÓN DE ASSETS MEDIANTE IA

Para cada asset que necesite generación:

crear primero una especificación.

Ejemplo:

ASSET:

Cyberpunk fighter male

STYLE:

realistic stylized

BODY:

athletic human

CLOTHING:

urban futuristic combat clothing

COLORS:

dark neutral palette with neon accents

IMPORTANT:

original design.

Después generar el asset.

Aplicar el mismo principio a:

personajes

armas

escenarios

texturas

props

VFX

audio

45. REGLA DE ORIGINALIDAD

El juego puede inspirarse en el género fighting.

Pero NO debe copiar:

personajes existentes

nombres existentes

logos

música

sonidos

fatalities

movimientos característicos

diseños

escenarios

diálogos

interfaces

Crear una identidad propia.

46. EXPERIENCIA DEL JUGADOR

Una partida debe sentirse así:

MENU

↓

CHARACTER SELECT

↓

MATCHMAKING

↓

MAP

↓

ROUND 1

↓

COMBAT

↓

ROUND 2

↓

COMBAT

↓

ROUND 3

↓

VICTORY

↓

RESULT SCREEN

↓

REMATCH / MENU

El jugador debe entender qué hacer sin tutorial extenso.

47. REGLAS DE DISEÑO DEL COMBATE

El combate debe premiar:

timing

posicionamiento

lectura del rival

defensa

paciencia

ejecución

No debe premiar únicamente:

"presionar botones rápidamente".

Cada ataque debe tener:

startup

active frames

recovery

damage

stun

knockback

stamina cost

Esto permitirá balancear el juego posteriormente.

48. BALANCE

Ningún personaje debe ser claramente superior.

Cada personaje debe tener:

FORTALEZAS

DEBILIDADES

MATCHUPS

La ventaja debe depender de habilidad del jugador.

49. NO CREAR MECÁNICAS INNECESARIAS

El MVP NO necesita:

battle pass

tienda

skins

ranking

clanes

chat de voz

3v3

5v5

historia cinematográfica

mundo abierto

campaña completa

Primero hacer excelente el 1v1.

50. DEFINICIÓN DE MVP TERMINADO

El MVP se considera terminado cuando:

[ ] El juego abre correctamente.

[ ] El menú funciona.

[ ] El usuario puede registrarse.

[ ] El usuario puede iniciar sesión.

[ ] El usuario puede seleccionar personaje.

[ ] Existen 4 personajes.

[ ] Existen 3 mapas.

[ ] Los mapas se seleccionan aleatoriamente.

[ ] Dos jugadores pueden conectarse.

[ ] Los jugadores pueden moverse.

[ ] Los jugadores pueden atacar.

[ ] Los ataques hacen daño correctamente.

[ ] Existen combos.

[ ] Existe defensa.

[ ] Existe esquiva.

[ ] Existe stamina.

[ ] Existen habilidades especiales.

[ ] Existen armas/objetos.

[ ] Existe sistema de rounds.

[ ] Existe KO.

[ ] Existe victoria/derrota.

[ ] El mapa Dock tiene ring-out.

[ ] El resultado se sincroniza correctamente entre jugadores.

[ ] El jugador puede volver al menú.

[ ] No existen errores críticos.

[ ] El juego puede compilarse para Windows.

51. MODO DE TRABAJO OBLIGATORIO

Trabajaremos de manera incremental.

Cada respuesta tuya debe comenzar indicando:

FASE ACTUAL

OBJETIVO

ARCHIVOS/SISTEMAS INVOLUCRADOS

Después debes realizar solamente la tarea correspondiente.

Cuando termines:

indicar qué se creó

indicar qué se modificó

indicar cómo probarlo

indicar qué debería ocurrir

indicar errores conocidos

indicar siguiente tarea recomendada

NO avanzar automáticamente a la siguiente fase si la fase actual todavía tiene errores.

52. PRIMERA TAREA

NO empieces creando personajes, mapas, armas ni menús.

Primero:

analizar este documento

convertirlo en una arquitectura técnica

definir estructura de carpetas

definir sistemas principales

definir dependencias

definir roadmap

definir estrategia de networking

definir cómo se generarán los assets mediante IA

definir qué herramientas de IA pueden utilizarse

definir cómo probaremos cada fase

Después de presentar ese plan:

ESPERA MI CONFIRMACIÓN.

No escribas todavía todo el juego.

OBJETIVO FINAL

Crear un videojuego de peleas 3D online 1v1 para PC con una identidad cyberpunk urbana, combates rápidos, combos, habilidades, armas improvisadas, escenarios interactivos y una arquitectura preparada para crecer.

Debe sentirse como:

"una pelea brutal y competitiva en un futuro urbano decadente"

y NO como:

"un juego genérico de superhéroes con poderes".

La prioridad es que sea:

DIVERTIDO.

RESPONSIVO.

COMPETITIVO.

VISUALMENTE IMPACTANTE.

FUNCIONAL.

ONLINE.

Y TÉCNICAMENTE SÓLIDO.

Comienza únicamente con la planificación técnica de la FASE 0.

This project was built with [Lovable](https://lovable.dev).

## Build with Lovable

Continue developing this project in the [Lovable editor](https://lovable.dev/projects/678eb411-ee39-48c3-a4f5-859507b79209).

- **Ship faster**: describe what you want to build and Lovable handles the code.
- **Stay in sync**: every change made in Lovable is committed straight to this repository.
- **Full ownership**: this code is yours. Push to `main` on GitHub and your changes sync back into Lovable, ready for your next prompt.

## Development

Prefer working locally? You need Node.js and npm — [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating).

```sh
git clone <this-repository-url>
cd <repository-name>
npm i
npm run dev
```
