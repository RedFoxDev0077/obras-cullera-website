/* ==========================================================================
   OBRAS CULLERA — trilingual layer (EN source · ES · FR)
   English lives in the HTML; this file supplies the Spanish and French.
   Missing keys fall back to the English in the markup.
   ========================================================================== */
window.OCI18N = (function () {
  'use strict';

  var ES = {
/* --- chrome ------------------------------------------------------------ */
'brand.sub':'Negocios y Desarrollo Internacional',
'nav.home':'Inicio','nav.about':'Quiénes Somos','nav.what':'Qué Hacemos','nav.projects':'Proyectos',
'nav.impact':'Nuestro Impacto','nav.news':'Actualidad','nav.contact':'Contacto',
'nav.about.story':'Nuestra historia','nav.about.values':'Valores y gobernanza','nav.about.footprint':'Dónde operamos',
'nav.what.platforms':'Nuestras cuatro plataformas','nav.what.lifecycle':'Ciclo de vida del proyecto','nav.what.ppp':'APP y financiación al desarrollo',
'cta.contact':'Contacto','ui.discover':'Descubrir','ui.drag':'Desplácese para explorar','ui.read':'Leer el comunicado',
'tile.1':'Quiénes somos','tile.2':'Nuestro marco de impacto','tile.3':'Hable con el grupo',
'country.es':'España','country.gn':'República de Guinea','country.sn':'Senegal',
'form.email':'Correo electrónico','form.subscribe':'Suscribirse',
'form.ok':'Gracias — hemos registrado su mensaje.','form.err':'Por favor, complete los campos obligatorios.',
'ct.ok':'Gracias. Su consulta ha quedado registrada y recibirá respuesta de una persona designada.',
'tag.press':'Nota de prensa','tag.insight':'Análisis',

/* --- home -------------------------------------------------------------- */
'home.hero.eyebrow':'Negocios y Desarrollo Internacional',
'home.hero.title':'Convertimos oportunidades en<br><em>proyectos con futuro</em>',
'home.hero.sub':'Identificamos oportunidades, conectamos socios estratégicos y participamos en la estructuración y desarrollo de proyectos y negocios con vocación internacional.',
'home.hero.cta1':'Nuestras áreas de actividad','home.hero.cta2':'Quiénes somos','home.hero.scroll':'Desplazar',
'home.hero.cap1':'Infraestructuras y desarrollo',
'home.hero.cap2':'Industria y logística',
'home.hero.cap3':'Energía y recursos',
'home.hero.cap4':'Desarrollo urbano y territorial',
'home.mission.eyebrow':'Nuestra visión',
'home.mission.title':'Las oportunidades adquieren valor<br><em>cuando sabemos conectarlas.</em>',
'home.mission.p1':'Obras Cullera es una compañía española de negocios y desarrollo orientada a la identificación, estructuración y desarrollo de oportunidades empresariales y proyectos con vocación internacional.',
'home.mission.p2':'Conectamos iniciativa, conocimiento, capital y socios estratégicos para impulsar operaciones en distintos sectores y mercados, participando en cada proyecto con una estructura adaptada a sus necesidades y objetivos.',
'home.mission.badge':'<b>ISO 9001 · 14001 · 45001</b> <span>Sistemas de gestión certificados</span>',
'home.mission.link':'Conocer Obras Cullera',
'home.stat1':'Fundada en Cullera, Valencia','home.stat2':'Cartera en desarrollo',
'home.stat3':'Proyectos entregados desde su fundación','home.stat4':'Países de operación',
'home.pillars.eyebrow':'Dónde creamos valor',
'home.pillars.title':'Cuatro ámbitos de<br><em>desarrollo y oportunidad</em>',
'home.pillars.sub':'Seleccionamos oportunidades en las que nuestra capacidad para conectar iniciativa, socios, conocimiento y recursos pueda contribuir a transformar una oportunidad en un proyecto viable.',
'home.pillar1.t':'Infraestructuras y desarrollo',
'home.pillar1.p':'Identificación, estructuración y desarrollo de oportunidades vinculadas a infraestructuras, equipamientos, desarrollos inmobiliarios y transformación territorial.',
'home.pillar2.t':'Industria e implantación empresarial',
'home.pillar2.p':'Desarrollo de oportunidades industriales y acompañamiento de empresas en su implantación en nuevos mercados, conectando inversión, socios y capacidades locales.',
'home.pillar3.t':'Aviación y conectividad',
'home.pillar3.p':'Desarrollo e intermediación en oportunidades vinculadas a conectividad aérea, operadores, nuevas rutas y soluciones de transporte y movilidad internacional.',
'home.pillar4.t':'Inversión y oportunidades estratégicas',
'home.pillar4.p':'Identificación y estructuración de oportunidades de inversión y negocio, creación de alianzas y desarrollo de operaciones junto a socios estratégicos.',
'home.platforms.eyebrow':'Nuestras plataformas',
'home.platforms.title':'Un grupo,<br>cuatro <em>capacidades</em>',
'home.platforms.sub':'Cada plataforma cuenta con su propia dirección de ingeniería, disciplina de balance y equipos de país — y están diseñadas para combinarse en un mismo mandato.',
'home.acc1.t':'Obra Pública e Ingeniería Civil',
'home.acc1.p':'Contratos de diseño y construcción, y de diseño-construcción-mantenimiento, para corredores viarios nacionales, puentes, obra civil y edificios públicos. Asumimos la responsabilidad de la constructibilidad desde el primer estudio de viabilidad y ponemos precio a la curva de mantenimiento a veinte años antes de firmar.',
'home.acc1.tag1':'Corredores viarios','home.acc1.tag2':'Puentes y estructuras','home.acc1.tag3':'Salud y educación','home.acc1.tag4':'Diseño-construcción-mantenimiento',
'home.acc2.t':'Energía, Agua y Medio Ambiente',
'home.acc2.p':'Generación solar e híbrida, distribución en media tensión, producción y redes de agua potable, saneamiento y residuos sólidos. Con contadores, facturación y formación de operadores para que el activo siga siendo solvente en el año diez.',
'home.acc2.tag1':'Solar e híbrida','home.acc2.tag2':'Redes de distribución','home.acc2.tag3':'Agua y saneamiento','home.acc2.tag4':'Formación de operadores',
'home.acc3.t':'Recursos Naturales e Industria',
'home.acc3.p':'Pistas de acarreo, cintas transportadoras, parques de almacenamiento, interfaces portuarias y polígonos industriales para los sectores minero y agroindustrial — estructurados para que una parte del procesamiento, y por tanto del margen, permanezca en el país.',
'home.acc3.tag1':'Logística mina-puerto','home.acc3.tag2':'Plataformas de procesamiento','home.acc3.tag3':'Polígonos industriales','home.acc3.tag4':'Contenido local',
'home.acc4.t':'Financiación al Desarrollo y Asesoría APP',
'home.acc4.p':'Estructuración de proyectos, documentación de concesiones y APP, financiación mixta con bancos de desarrollo y agencias de crédito a la exportación, y la transparencia en la contratación que permite a un ministerio defender una operación en público.',
'home.acc4.tag1':'Concesiones y APP','home.acc4.tag2':'Financiación mixta','home.acc4.tag3':'Crédito a la exportación','home.acc4.tag4':'Integridad en la contratación',
'home.map.eyebrow':'Presencia global',
'home.map.title':'Presentes en <em>12 países</em><br>de tres regiones',
'home.map.link':'Ver todos los proyectos',
'home.rail.eyebrow':'Trabajos seleccionados','home.rail.title':'Proyectos en <em>ejecución</em>',
'home.quote':'Un ministerio no necesita un contratista. Necesita un socio que siga contestando al teléfono en el año quince, cuando la garantía haya expirado y la carretera siga soportando camiones.',
'home.quote.by':'El Comité Ejecutivo','home.quote.role':'Obras Cullera',
'mq.1':'Corredores viarios','mq.2':'Agua potable','mq.3':'Generación solar','mq.4':'Hospitales y escuelas','mq.5':'Puertos y logística','mq.6':'Polígonos industriales','mq.7':'Estructuración APP',
'home.impact.eyebrow':'Nuestro impacto','home.impact.title':'Medido allí donde<br>se <em>siente</em>',
'home.impact.sub':'Reportamos frente a los Objetivos de Desarrollo Sostenible de Naciones Unidas en cada mandato, y publicamos las cifras nos favorezcan o no.',
'home.impact.link':'Leer el marco de impacto',
'sdg.6':'Agua limpia y saneamiento','sdg.7':'Energía asequible y no contaminante','sdg.8':'Trabajo decente y crecimiento','sdg.9':'Industria e infraestructura','sdg.11':'Ciudades sostenibles','sdg.17':'Alianzas para lograr los objetivos',
'home.imp1':'Empleos sostenidos en el grupo','home.imp2':'Compras a proveedores locales','home.imp3':'Personas con nuevo acceso al agua','home.imp4':'Comunidades en programas activos',
'home.news.eyebrow':'Sala de prensa','home.news.title':'Actualidad<br>e <em>ideas</em>','home.news.link':'Todas las novedades',
'home.cta.eyebrow':'Trabaje con nosotros',
'home.cta.title':'Tráiganos el problema<br>antes de que sea<br>un <em>concurso</em>',
'home.cta.sub':'Nuestro mejor trabajo empieza en la fase de viabilidad, cuando el alcance, la estructura financiera y el modelo de mantenimiento aún pueden diseñarse juntos.',

/* --- footer ------------------------------------------------------------ */
'foot.news.title':'Perspectivas y oportunidades',
'foot.news.sub':'Actualidad corporativa, mercados, proyectos y análisis sobre desarrollo internacional.',
'foot.blurb':'Obras Cullera S.L. — Negocios y Desarrollo Internacional.<br>Identificación, estructuración, desarrollo y coordinación de oportunidades y proyectos internacionales.',
'foot.col1':'Grupo','foot.col2':'Participe','foot.col3':'Oficinas',
'foot.careers':'Empleo','foot.suppliers':'Proveedores y socios',
'foot.legal':'Aviso legal','foot.privacy':'Privacidad','foot.cookies':'Cookies','foot.compliance':'Cumplimiento y denuncias',
'foot.hq':'Cullera, Valencia · Conakry, República de Guinea',

/* --- who we are -------------------------------------------------------- */
'about.hero.title':'Un grupo construido<br>para rendir <em>cuentas</em>',
'about.hero.sub':'Obras Cullera nació de una convicción sencilla: los países que más necesitan infraestructura merecen el mismo estándar de ingeniería, la misma gobernanza y el mismo servicio posterior que los países que ya la tienen.',
'about.story.eyebrow':'Nuestra historia',
'about.story.title':'De un pueblo costero<br>valenciano a<br><em>doce países</em>',
'about.story.p1':'El grupo comenzó en Cullera como contratista de obra civil en la costa valenciana: diques, viales municipales, redes de agua. La disciplina de aquella primera década, trabajando para ayuntamientos con presupuestos pequeños y memoria larga, se convirtió en la cultura operativa de todo lo que vino después.',
'about.story.p2':'Nuestro primer mandato internacional nos llevó a África Occidental. Lo que encontramos no fue escasez de ambición ni de capital, sino de socios dispuestos a permanecer después de la puesta en servicio. Construimos la compañía alrededor de esa carencia.',
'about.story.p3':'Hoy Obras Cullera opera como un grupo integrado de desarrollo: ayudamos a estructurar el proyecto, organizamos la financiación, construimos el activo y formamos a quienes lo operarán — y respondemos por el resultado de mantenimiento, no solo por el hito de construcción.',
'about.s1':'Año de fundación','about.s2':'Empleados y colaboradores estables','about.s3':'Nacionalidades en el grupo','about.s4':'Oficinas regionales',
'about.tl.eyebrow':'Hitos','about.tl.title':'Quince años,<br>una sola <em>dirección</em>',
'about.tl1.t':'Fundación en Cullera','about.tl1.p':'La sociedad se constituye como contratista de obra civil al servicio de los municipios de la costa valenciana.',
'about.tl2.t':'Primer mandato internacional','about.tl2.p':'Obras de agua y drenaje municipal en África Occidental marcan el inicio de la práctica internacional del grupo.',
'about.tl3.t':'Apertura de la oficina de Conakry','about.tl3.p':'Una plataforma permanente en la República de Guinea, con equipos locales de ingeniería, compras y relación con la comunidad.',
'about.tl4.t':'Práctica de financiación al desarrollo','about.tl4.p':'El grupo formaliza su plataforma de asesoría en APP y financiación mixta para estructurar proyectos junto a bancos de desarrollo.',
'about.tl5.t':'Plataforma de energía y agua','about.tl5.p':'La generación solar, la distribución y la producción de agua potable se consolidan en una plataforma operativa propia.',
'about.tl6.t':'Primera Revisión de Impacto y Gobernanza','about.tl6.p':'El grupo publica datos sociales, ambientales y de contratación auditados de todos los mandatos activos.',
'about.val.eyebrow':'Valores y gobernanza','about.val.title':'Seis compromisos<br>que se nos pueden <em>exigir</em>',
'about.val.sub':'No son aspiraciones. Cada uno figura en nuestros contratos, se audita anualmente y se publica.',
'about.v1.t':'Integridad en la contratación','about.v1.p':'Registros de licitación abiertos, intermediarios declarados y tolerancia cero con los pagos de facilitación, sin excepción en ninguna jurisdicción.',
'about.v2.t':'Disciplina de ingeniería','about.v2.p':'Revisión independiente del diseño antes de la movilización y un modelo de coste de ciclo de vida adjunto a cada propuesta técnica.',
'about.v3.t':'Contenido local','about.v3.p':'Un mínimo contractual de empleo local, compra local y transferencia de tecnología en cada mandato, medido trimestralmente.',
'about.v4.t':'Gestión ambiental','about.v4.p':'Evaluación de impacto alineada con las Normas de Desempeño de la IFC, con obligaciones de restauración financiadas desde el presupuesto de obra.',
'about.v5.t':'Seguridad sin excepciones','about.v5.p':'Un único estándar de seguridad en todo el grupo, aplicado a los subcontratistas en los mismos términos que a nuestros propios equipos.',
'about.v6.t':'Presencia tras la entrega','about.v6.p':'Todo contrato incluye una obligación de operación y mantenimiento, un plan de repuestos y un equipo local formado.',
'about.fp.eyebrow':'Dónde operamos','about.fp.title':'Tres regiones,<br>un mismo <em>estándar</em>',
'about.fp.sub':'África Occidental es nuestro centro de gravedad. Iberia acoge nuestras funciones de ingeniería y corporativas. El Magreb conecta ambas.',
'about.fp1.t':'África Occidental','about.fp1.p':'Guinea, Senegal, Costa de Marfil, Malí, Cabo Verde, Camerún, Gabón y Guinea Ecuatorial. Plataformas de país con equipos residentes de ingeniería y comunidad.',
'about.fp2.t':'Iberia','about.fp2.p':'Sede del grupo en Cullera, Valencia, más una alianza de ingeniería portuguesa. Diseño, compras, tesorería y cumplimiento.',
'about.fp3.t':'Magreb','about.fp3.p':'Marruecos y Mauritania. Obras de polígonos industriales, clústeres solares y el corredor logístico que une los puertos atlánticos con el Sahel.',
'about.quote':'Preferimos perder un concurso antes que ganarlo sobre hipótesis que no podríamos defender ante el ministerio que después tendrá que vivir con el activo.',
'about.cta.eyebrow':'Siguiente','about.cta.title':'Vea cómo se organiza<br>el <em>grupo</em>',

/* --- what we do -------------------------------------------------------- */
'wwd.hero.title':'Estructurarlo.<br>Financiarlo. <em>Construirlo.</em><br>Mantenerlo en marcha.',
'wwd.hero.sub':'Cuatro plataformas que pueden desplegarse por separado o combinarse en un mismo mandato — desde el primer estudio de viabilidad hasta el vigésimo año de operación.',
'wwd.pf.eyebrow':'Nuestras plataformas','wwd.pf.title':'Capacidades que<br>encajan <em>entre sí</em>',
'wwd.pf.sub':'La mayoría de nuestros mandatos combinan al menos dos plataformas. Un corredor viario necesita ingeniería civil y una estructura financiera; un clúster solar necesita generación, distribución y un operador que siga formado en el año cinco.',
'wwd.p1.p':'Corredores viarios nacionales y regionales, puentes y estructuras, puertos y obras de lado aire, hospitales, escuelas y edificios administrativos. Trabajamos en formatos de diseño-construcción y diseño-construcción-mantenimiento, y asumimos la responsabilidad de constructibilidad desde la fase de viabilidad.',
'wwd.p2.p':'Generación solar e híbrida a escala de red, distribución en media tensión y electrificación rural, producción y distribución de agua potable, saneamiento y residuos sólidos. Cada esquema se entrega con contadores, un modelo tarifario y un programa de formación del operador.',
'wwd.p3.p':'Pistas de acarreo, cintas, parques de almacenamiento e interfaces portuarias para el sector minero; plataformas de procesamiento, cadena de frío y polígonos industriales para la agroindustria. Estructuramos estos mandatos para que una parte definida del procesamiento — y por tanto del margen y de las competencias — permanezca en el país.',
'wwd.p4.p':'Estructuración y modelización financiera, documentación de concesiones y APP, financiación mixta con bancos de desarrollo, fondos soberanos y agencias de crédito a la exportación, y la transparencia en la contratación que permite defender una operación en público y ante el parlamento.',
'wwd.lc.eyebrow':'Ciclo de vida del proyecto','wwd.lc.title':'Seis etapas,<br>un equipo <em>responsable</em>',
'wwd.lc.sub':'El mismo director de proyecto responde desde la originación hasta el final del período de mantenimiento. La continuidad es el mecanismo de control.',
'wwd.lc1.t':'Originación y viabilidad','wwd.lc1.p':'Análisis de demanda, selección de trazado o emplazamiento, cribado ambiental y social, y una primera envolvente de coste honesta — incluido lo que costará conservarlo.',
'wwd.lc2.t':'Estructuración y financiación','wwd.lc2.p':'Arquitectura contractual o concesional, reparto de riesgos y organización de tramos soberanos, de banca de desarrollo, de crédito a la exportación y comerciales.',
'wwd.lc3.t':'Diseño y revisión independiente','wwd.lc3.p':'Ingeniería de detalle, con una revisión de diseño por tercero encargada por nosotros y comunicada al cliente antes de la movilización.',
'wwd.lc4.t':'Construcción','wwd.lc4.p':'Equipos locales, proveedores locales y un régimen de seguridad residente aplicado por igual a nuestros equipos y a nuestros subcontratistas.',
'wwd.lc5.t':'Puesta en servicio y transferencia','wwd.lc5.p':'Pruebas de rendimiento, documentación as-built en la lengua de trabajo del operador y un inventario de repuestos financiado.',
'wwd.lc6.t':'Operación y mantenimiento','wwd.lc6.p':'Un período de mantenimiento contratado con objetivos de disponibilidad publicados y un equipo nacional formado capaz de asumirlo al final.',
'wwd.ppp.eyebrow':'APP y financiación al desarrollo',
'wwd.ppp.title':'Una operación<br>que un ministro puede<br><em>defender en público</em>',
'wwd.ppp.p1':'Las colaboraciones público-privadas fracasan por razones previsibles: previsiones de demanda optimistas, riesgos trasladados a quien menos puede soportarlos y un mantenimiento tratado como problema ajeno. Estructuramos contra las tres.',
'wwd.ppp.p2':'Nuestro equipo asesor trabaja junto a los ministerios de finanzas, infraestructuras y planificación para producir documentación que resista una auditoría, un cambio de gobierno y un debate público — porque fue escrita esperando los tres.',
'wwd.ppp1.t':'Fuentes de financiación','wwd.ppp1.p':'Bancos de desarrollo multilaterales y bilaterales, agencias de crédito a la exportación, fondos soberanos y regionales, y tramos comerciales tarificados sobre un reparto de riesgos real.',
'wwd.ppp2.t':'Paquete de transparencia','wwd.ppp2.p':'Registros de licitación publicados, intermediarios declarados, un registro abierto de modificaciones y una revisión independiente anual del cumplimiento del contrato.',
'wwd.s3':'Socios de financiación al desarrollo','wwd.s4':'Horizonte estándar de coste de ciclo de vida',
'wwd.cta.eyebrow':'Siguiente','wwd.cta.title':'Vea las capacidades<br>en <em>obra</em>',

/* --- projects ---------------------------------------------------------- */
'proj.hero.title':'Activos en<br><em>ejecución</em>',
'proj.hero.sub':'Una cartera viva en doce países — corredores viarios, hospitales, sistemas de agua, clústeres solares y plataformas industriales, cada uno con un director de proyecto designado y una obligación de mantenimiento publicada.',
'proj.s2':'Mandatos actualmente en ejecución','proj.s3':'Corredores viarios construidos o rehabilitados','proj.s4':'Entregados dentro del plazo contratado',
'proj.grid.eyebrow':'Cartera','proj.grid.title':'Filtrar por <em>sector</em>',
'filter.all':'Todos los proyectos','filter.transport':'Transporte','filter.water':'Agua','filter.energy':'Energía',
'filter.social':'Infraestructura social','filter.logistics':'Logística e industria','filter.urban':'Desarrollo urbano',
'filter.empty':'Todavía no hay proyectos en este sector.',
'fact.length':'Longitud','fact.period':'Período','fact.model':'Modelo','fact.people':'Personas atendidas','fact.area':'Superficie','fact.capacity':'Capacidad','fact.beds':'Camas',
'proj.1.t':'Mejora del corredor Conakry–Kindia','proj.1.loc':'Conakry → Kindia · República de Guinea',
'proj.1.p':'Rehabilitación y ampliación del corredor nacional que sirve al interior occidental de la capital, con drenaje, pasos para las comunidades y una obligación de mantenimiento a diez años.',
'proj.2.t':'Programa de Agua Urbana de Nzérékoré','proj.2.loc':'Nzérékoré · República de Guinea',
'proj.2.p':'Producción, almacenamiento y distribución para una capital regional en crecimiento, con contadores, modelo tarifario y un operador municipal formado.',
'proj.3.t':'Plataforma Logística Industrial de Boké','proj.3.loc':'Boké · República de Guinea',
'proj.3.p':'Parques de almacenamiento, interfaz con la pista de acarreo y un polígono industrial urbanizado, diseñados para retener en la región el primer nivel de procesamiento y su empleo.',
'proj.4.t':'Clúster Solar de Nuakchot','proj.4.loc':'Nuakchot · Mauritania',
'proj.4.p':'Generación fotovoltaica a escala de red con almacenamiento de firmeza y una línea de evacuación en media tensión hacia la red de distribución de la capital.',
'proj.5.t':'Hospital Regional de Kankan','proj.5.loc':'Kankan · República de Guinea',
'proj.5.p':'Un hospital regional de referencia de 240 camas con bloques de imagen, quirúrgico y maternidad, respaldo solar y un contrato de gestión de instalaciones a cinco años.',
'proj.6.t':'Corredor Agrícola de Ziguinchor','proj.6.loc':'Ziguinchor · Senegal',
'proj.6.p':'Caminos de acceso, almacenamiento frigorífico y una plataforma de mercado que conectan a los productores de Casamance con el puerto regional y con Dakar.',
'proj.7.t':'Regeneración del Frente Marítimo de Cullera','proj.7.loc':'Cullera, Valencia · España',
'proj.7.p':'Defensa costera, espacio público y obras de movilidad en el frente marítimo de la sede del grupo, ejecutadas por fases alrededor de la temporada turística.',
'proj.8.t':'Terminal de Graneles de Abiyán','proj.8.loc':'Abiyán · Costa de Marfil',
'proj.8.p':'Recepción, almacenamiento y carga de grano a granel en el puerto, con interfaz preparada para ferrocarril y un compartimento de reserva estratégica nacional.',
'proj.9.t':'Cruce del Kolenté y obras frente a crecidas','proj.9.loc':'Kindia · República de Guinea',
'proj.9.p':'Un nuevo puente sobre el río y su protección frente a crecidas, secuenciados para que el corredor permanezca abierto al tráfico durante toda la obra.',
'proj.note':'Se muestran mandatos seleccionados. Las referencias completas, los dossieres técnicos y las certificaciones de cliente están disponibles para contrapartes del sector público a solicitud.',
'proj.cta.eyebrow':'¿Considera un mandato?','proj.cta.title':'Todo proyecto aquí<br>empezó siendo una <em>conversación</em>',

/* --- impact ------------------------------------------------------------ */
'imp.hero.title':'Lo que el activo<br>deja <em>detrás</em>',
'imp.hero.sub':'Un proyecto de infraestructura se juzga dos veces: una en la inauguración y otra una década después. Construimos y reportamos para el segundo juicio.',
'imp.fw.eyebrow':'Nuestro marco','imp.fw.title':'Cuatro obligaciones,<br>en <em>cada</em> contrato<br>que firmamos',
'imp.fw.p1':'El impacto no es un ejercicio de comunicación. En cada mandato negociamos cuatro obligaciones medibles dentro del propio contrato, y reportamos trimestralmente al cliente y anualmente en público.',
'imp.fw.p2':'Cuando incumplimos un objetivo, la revisión lo dice. Un marco que solo produce buenas noticias no es un marco.',
'imp.fw.link':'Leer la última revisión',
'imp.o1.t':'01 — Empleo y competencias locales','imp.o1.p':'Un mínimo contractual de empleo nacional en todas las categorías, plazas de aprendizaje ligadas al programa de obra y un sucesor designado para cada puesto expatriado.',
'imp.o2.t':'02 — Compra local','imp.o2.p':'Una parte mínima del gasto con proveedores registrados en el país anfitrión, con plazos de pago lo bastante cortos para que las pequeñas empresas puedan participar de verdad.',
'imp.o3.t':'03 — Medio ambiente y restauración','imp.o3.p':'Evaluación alineada con las Normas de Desempeño de la IFC, restauración financiada desde el presupuesto de obra en lugar de aplazada, y monitorizada durante tres años tras la entrega.',
'imp.o4.t':'04 — Comunidad y reclamaciones','imp.o4.p':'Un mecanismo de reclamación publicado con plazos de respuesta, agentes de enlace comunitario residentes en obra y registros de compensación abiertos a auditoría independiente.',
'imp.sdg.eyebrow':'Alineación','imp.sdg.title':'Reportado frente a<br>los <em>ODS</em> de la ONU',
'imp.sdg.sub':'Seis objetivos concentran el peso de nuestra cartera. Asignamos cada mandato a los objetivos que realmente sirve, y no reclamamos los que no.',
'imp.s4':'Mujeres en la plantilla del grupo',
'imp.prog.eyebrow':'Programas','imp.prog.title':'Más allá del<br><em>vallado de obra</em>',
'imp.prog.sub':'Cuatro programas permanentes acompañan a nuestra actividad constructora, financiados como un porcentaje fijo del valor del contrato y no con presupuestos discrecionales.',
'imp.pr1.t':'Escuelas de obra','imp.pr1.p':'Formación certificada en topografía, manejo de maquinaria y oficios eléctricos y civiles, impartida en obra y reconocida por la autoridad nacional de formación profesional.',
'imp.pr2.t':'Desarrollo de proveedores','imp.pr2.p':'Apoyo a la precalificación, formación en seguridad y facilidades de anticipo para que las empresas locales puedan licitar nuestros paquetes en condiciones realistas.',
'imp.pr3.t':'Puntos de agua y salud','imp.pr3.p':'Pozos, fuentes públicas y mejoras de dispensarios en las comunidades de nuestros corredores, entregados a titularidad municipal con una dotación de mantenimiento.',
'imp.pr4.t':'Becas de ingeniería','imp.pr4.p':'Plazas universitarias y prácticas remuneradas para estudiantes de las regiones donde construimos, con oferta garantizada de primer empleo al graduarse.',
'imp.gov.eyebrow':'Gobernanza','imp.gov.title':'El cumplimiento como<br><em>sistema operativo</em>',
'imp.gov.sub':'Nuestra función de cumplimiento reporta al consejo, no a la línea comercial. Puede detener una licitación, y lo ha hecho.',
'imp.g1.t':'Anticorrupción','imp.g1.p':'Tolerancia cero con los pagos de facilitación, intermediarios declarados y diligencia debida obligatoria sobre la contraparte antes de cualquier compromiso.',
'imp.g2.t':'Canal de denuncias','imp.g2.p':'Un canal operado externamente, disponible en español, francés, inglés y portugués, con garantías de protección y estadísticas de casos publicadas.',
'imp.g3.t':'Sistemas certificados','imp.g3.p':'Calidad ISO 9001, medio ambiente ISO 14001 y seguridad y salud ISO 45001, auditados en todos los territorios de operación.',
'imp.note':'Las cifras mostradas son valores indicativos de marcador para el lanzamiento de este sitio y se sustituirán por los datos auditados publicados en la Revisión de Impacto y Gobernanza del grupo.',
'imp.cta.eyebrow':'Siguiente','imp.cta.title':'Pídanos los<br><em>números</em>',

/* --- news -------------------------------------------------------------- */
'news.hero.title':'Sala de prensa<br>e <em>ideas</em>',
'news.hero.sub':'Hitos de proyecto, publicaciones de gobernanza y comentario sobre cómo se financia, se construye y se mantiene realmente la infraestructura.',
'news.1.date':'12 de junio de 2026','news.1.loc':'Conakry',
'news.1.t':'Firmado el acuerdo marco para la mejora del corredor Conakry–Kindia',
'news.1.p':'El acuerdo cubre la rehabilitación y ampliación de 132 kilómetros de corredor nacional, junto con drenaje, pasos para las comunidades y una obligación de mantenimiento a diez años asumida por el grupo.',
'news.2.date':'4 de mayo de 2026','news.2.loc':'Kankan',
'news.2.t':'Primera piedra del Hospital Regional de Kankan, nuestro primer mandato sanitario en Alta Guinea',
'news.3.date':'21 de marzo de 2026','news.3.loc':'Cullera',
'news.3.t':'El grupo publica su primera Revisión de Impacto y Gobernanza',
'news.4.date':'18 de febrero de 2026','news.4.loc':'Nuakchot',
'news.4.t':'El clúster solar de Nuakchot alcanza el cierre financiero con tres socios de desarrollo',
'news.5.date':'29 de enero de 2026','news.5.t':'Soberanía infraestructural: ¿de quién es el presupuesto de mantenimiento?',
'news.6.date':'11 de diciembre de 2025','news.6.t':'Contenido local: cómo construir cadenas de suministro que permanezcan cuando el contratista se marcha',
'news.7.date':'3 de noviembre de 2025','news.7.loc':'Ziguinchor',
'news.7.t':'Puestas en servicio las primeras cámaras frigoríficas del corredor agrícola de Ziguinchor',
'news.all.eyebrow':'Todas las novedades','news.all.title':'Recientes del<br><em>grupo</em>',
'news.note':'Los artículos mostrados son contenido de marcador preparado para el lanzamiento. Las consultas de prensa las atiende la oficina de comunicación del grupo.',
'news.quote':'La pregunta nunca es si un país puede construir una carretera. Es si, cinco años después, alguien ha recibido el presupuesto y la formación para repararla.',
'news.cta.eyebrow':'Prensa y consultas','news.cta.title':'Hable con la oficina<br>de <em>comunicación</em>',

/* --- contact ----------------------------------------------------------- */
'ct.hero.title':'Hable con<br>el <em>grupo</em>',
'ct.hero.sub':'Mandatos del sector público, socios de desarrollo, proveedores y candidatos — toda consulta llega a una persona con nombre, y toda consulta se responde.',
'ct.form.eyebrow':'Enviar una consulta','ct.form.title':'Cuéntenos qué<br>necesita <em>construir</em>',
'ct.f.name':'Nombre completo','ct.f.org':'Organización / ministerio','ct.f.country':'País','ct.f.subject':'Naturaleza de la consulta','ct.f.msg':'Mensaje',
'ct.opt1':'Mandato o proyecto del sector público','ct.opt2':'Financiación al desarrollo / estructuración APP','ct.opt3':'Registro de proveedor o subcontratista','ct.opt4':'Empleo','ct.opt5':'Prensa y comunicación','ct.opt6':'Cumplimiento o denuncias',
'ct.send':'Enviar consulta',
'ct.note':'Este formulario es una demostración de front-end para la versión de lanzamiento; no se transmite ni almacena ningún dato. Se conectará al buzón del grupo antes de la puesta en producción.',
'ct.off.eyebrow':'Oficinas',
'ct.off1.city':'Cullera, Valencia','ct.off1.tag':'Sede central','ct.off1.a':'Passeig Marítim · 46400 Cullera, Valencia · España',
'ct.off2.city':'Conakry','ct.off2.tag':'Sede regional','ct.off2.a':'Comuna de Kaloum · Conakry · República de Guinea',
'ct.off3.city':'Dakar','ct.off3.tag':'Oficina de país','ct.off3.a':'Plateau · Dakar · Senegal',
'ct.careers.t':'Empleo','ct.careers.p':'Buscamos ingenieros, aparejadores, especialistas ambientales y sociales y profesionales financieros en las tres regiones. Las candidaturas de nacionales de nuestros países de acogida tienen prioridad en todas las categorías.',
'ct.sup.t':'Proveedores y socios','ct.sup.p':'Los proveedores locales pueden inscribirse en la precalificación en cualquier momento. La inscripción es gratuita, no requiere intermediario y nunca se solicita pago alguno a cambio de ser considerado.',
'ct.compliance':'¿Sospecha una irregularidad? Nuestro canal de denuncias está operado externamente y disponible en español, francés, inglés y portugués, con garantías de protección para quien informa.',
'ct.map.title':'Dónde puede<br><em>encontrarnos</em>',
'form.email.ph':'nombre@empresa.com',

  };

  var ES_MAP = {
    'gn':['República de Guinea','Plataforma de país y sede regional. Corredores viarios, hospitales, agua urbana y logística asociada a la minería.'],
    'es':['España','Sede del grupo en Cullera, Valencia. Ingeniería, compras y funciones corporativas.'],
    'sn':['Senegal','Corredores agrologísticos y programas municipales de agua en Casamance y la región de Dakar.'],
    'ci':['Costa de Marfil','Manipulación de grano y contenedores junto al puerto, y rehabilitación viaria en ciudades secundarias.'],
    'mr':['Mauritania','Clústeres solares a escala de red y distribución vinculada a desalación en torno a Nuakchot.'],
    'ma':['Marruecos','Obras de polígonos industriales y alianzas de ingeniería al servicio del corredor atlántico.'],
    'c.gn':['República de Guinea','Sede regional, Comuna de Kaloum, Conakry. Equipos de ingeniería, compras, comunidad y cumplimiento.'],
    'c.es':['España','Sede del grupo, Passeig Marítim, Cullera, Valencia. Diseño, tesorería, compras y funciones corporativas.'],
    'c.sn':['Senegal','Oficina de país, Plateau, Dakar. Desarrollo de negocio regional y supervisión de proyectos.']
  };

  var FR = {
/* --- chrome ------------------------------------------------------------ */
'brand.sub':'Affaires et Développement International',
'nav.home':'Accueil','nav.about':'Qui Sommes-Nous','nav.what':'Notre Métier','nav.projects':'Projets',
'nav.impact':'Notre Impact','nav.news':'Actualités','nav.contact':'Contact',
'nav.about.story':'Notre histoire','nav.about.values':'Valeurs et gouvernance','nav.about.footprint':'Où nous opérons',
'nav.what.platforms':'Nos quatre plateformes','nav.what.lifecycle':'Cycle de vie du projet','nav.what.ppp':'PPP et financement du développement',
'cta.contact':'Contact','ui.discover':'Découvrir','ui.drag':'Faites défiler pour explorer','ui.read':'Lire le communiqué',
'tile.1':'Qui sommes-nous','tile.2':'Notre cadre d’impact','tile.3':'Parler au groupe',
'country.es':'Espagne','country.gn':'République de Guinée','country.sn':'Sénégal',
'form.email':'Adresse e-mail','form.subscribe':'S’abonner',
'form.ok':'Merci — votre message a bien été enregistré.','form.err':'Veuillez compléter les champs obligatoires.',
'ct.ok':'Merci. Votre demande a été enregistrée et recevra la réponse d’une personne nommée.',
'tag.press':'Communiqué','tag.insight':'Analyse',

/* --- home -------------------------------------------------------------- */
'home.hero.eyebrow':'Affaires et Développement International',
'home.hero.title':'Nous transformons les opportunités en<br><em>projets d’avenir</em>',
'home.hero.sub':'Nous identifions des opportunités, connectons des partenaires stratégiques et participons à la structuration et au développement de projets et d’activités à vocation internationale.',
'home.hero.cta1':'Nos domaines d’activité','home.hero.cta2':'Qui sommes-nous','home.hero.scroll':'Défiler',
'home.hero.cap1':'Infrastructures et développement',
'home.hero.cap2':'Industrie et logistique',
'home.hero.cap3':'Énergie et ressources',
'home.hero.cap4':'Développement urbain et territorial',
'home.mission.eyebrow':'Notre vision',
'home.mission.title':'Les opportunités prennent de la valeur<br><em>quand on sait les relier.</em>',
'home.mission.p1':'Obras Cullera est une société espagnole de développement et d’affaires, orientée vers l’identification, la structuration et le développement d’opportunités entrepreneuriales et de projets à vocation internationale.',
'home.mission.p2':'Nous relions initiative, savoir-faire, capitaux et partenaires stratégiques pour faire avancer des opérations dans différents secteurs et marchés, en participant à chaque projet avec une structure adaptée à ses besoins et à ses objectifs.',
'home.mission.badge':'<b>ISO 9001 · 14001 · 45001</b> <span>Systèmes de management certifiés</span>',
'home.mission.link':'Découvrir Obras Cullera',
'home.stat1':'Fondée à Cullera, Valence','home.stat2':'Portefeuille en développement',
'home.stat3':'Projets livrés depuis la création','home.stat4':'Pays d’opération',
'home.pillars.eyebrow':'Où nous créons de la valeur',
'home.pillars.title':'Quatre domaines de<br><em>développement et d’opportunité</em>',
'home.pillars.sub':'Nous sélectionnons les opportunités où notre capacité à relier initiative, partenaires, savoir-faire et ressources peut contribuer à transformer une opportunité en projet viable.',
'home.pillar1.t':'Infrastructures et développement',
'home.pillar1.p':'Identification, structuration et développement d’opportunités liées aux infrastructures, aux équipements, aux développements immobiliers et à la transformation territoriale.',
'home.pillar2.t':'Industrie et implantation',
'home.pillar2.p':'Développement d’opportunités industrielles et accompagnement des entreprises dans leur implantation sur de nouveaux marchés, en reliant investissement, partenaires et capacités locales.',
'home.pillar3.t':'Aviation et connectivité',
'home.pillar3.p':'Développement et intermédiation d’opportunités liées à la connectivité aérienne, aux opérateurs, aux nouvelles routes et aux solutions de transport et de mobilité internationale.',
'home.pillar4.t':'Investissement et opportunités stratégiques',
'home.pillar4.p':'Identification et structuration d’opportunités d’investissement et d’affaires, création d’alliances et développement d’opérations aux côtés de partenaires stratégiques.',
'home.platforms.eyebrow':'Nos plateformes',
'home.platforms.title':'Un groupe,<br>quatre <em>capacités</em>',
'home.platforms.sub':'Chaque plateforme dispose de sa propre direction d’ingénierie, de sa discipline financière et de ses équipes pays — et elles sont conçues pour être combinées sur un même mandat.',
'home.acc1.t':'Travaux Publics et Génie Civil',
'home.acc1.p':'Contrats de conception-réalisation et de conception-réalisation-maintenance pour les corridors routiers nationaux, les ponts, le génie civil et les bâtiments publics. Nous assumons la constructibilité dès la première étude de faisabilité et chiffrons la courbe d’entretien sur vingt ans avant de signer.',
'home.acc1.tag1':'Corridors routiers','home.acc1.tag2':'Ponts et ouvrages d’art','home.acc1.tag3':'Santé et éducation','home.acc1.tag4':'Conception-réalisation-maintenance',
'home.acc2.t':'Énergie, Eau et Environnement',
'home.acc2.p':'Production solaire et hybride, distribution en moyenne tension, production et réseaux d’eau potable, assainissement et déchets solides. Livrés avec comptage, facturation et formation des exploitants, afin que l’actif soit encore solvable la dixième année.',
'home.acc2.tag1':'Solaire et hybride','home.acc2.tag2':'Réseaux de distribution','home.acc2.tag3':'Eau et assainissement','home.acc2.tag4':'Formation des exploitants',
'home.acc3.t':'Ressources Naturelles et Industrie',
'home.acc3.p':'Pistes de halage, convoyeurs, aires de stockage, interfaces portuaires et zones industrielles pour les secteurs minier et agro-industriel — structurés pour qu’une part de la transformation, et donc de la marge, reste dans le pays hôte.',
'home.acc3.tag1':'Logistique mine-port','home.acc3.tag2':'Plateformes de transformation','home.acc3.tag3':'Zones industrielles','home.acc3.tag4':'Contenu local',
'home.acc4.t':'Financement du Développement et Conseil PPP',
'home.acc4.p':'Structuration de projets, documentation de concessions et de PPP, financement mixte avec les banques de développement et les agences de crédit à l’exportation, et la transparence des marchés qui permet à un ministère de défendre une opération en public.',
'home.acc4.tag1':'Concessions et PPP','home.acc4.tag2':'Financement mixte','home.acc4.tag3':'Crédit à l’exportation','home.acc4.tag4':'Intégrité des marchés',
'home.map.eyebrow':'Présence mondiale',
'home.map.title':'Présents dans <em>12 pays</em><br>sur trois régions',
'home.map.link':'Voir tous les projets',
'home.rail.eyebrow':'Travaux sélectionnés','home.rail.title':'Projets en <em>exécution</em>',
'home.quote':'Un ministère n’a pas besoin d’un entrepreneur. Il a besoin d’un partenaire qui répondra encore au téléphone la quinzième année, quand la garantie aura expiré et que la route portera toujours des camions.',
'home.quote.by':'Le Comité Exécutif','home.quote.role':'Obras Cullera',
'mq.1':'Corridors routiers','mq.2':'Eau potable','mq.3':'Production solaire','mq.4':'Hôpitaux et écoles','mq.5':'Ports et logistique','mq.6':'Zones industrielles','mq.7':'Structuration PPP',
'home.impact.eyebrow':'Notre impact','home.impact.title':'Mesuré là où<br>il se <em>ressent</em>',
'home.impact.sub':'Nous rendons compte des Objectifs de développement durable des Nations unies sur chaque mandat, et nous publions les chiffres qu’ils nous flattent ou non.',
'home.impact.link':'Lire le cadre d’impact',
'sdg.6':'Eau propre et assainissement','sdg.7':'Énergie propre et abordable','sdg.8':'Travail décent et croissance','sdg.9':'Industrie et infrastructure','sdg.11':'Villes durables','sdg.17':'Partenariats pour les objectifs',
'home.imp1':'Emplois soutenus dans le groupe','home.imp2':'Achats auprès de fournisseurs locaux','home.imp3':'Personnes ayant un nouvel accès à l’eau','home.imp4':'Communautés dans des programmes actifs',
'home.news.eyebrow':'Salle de presse','home.news.title':'Actualités<br>et <em>analyses</em>','home.news.link':'Toutes les actualités',
'home.cta.eyebrow':'Travailler avec nous',
'home.cta.title':'Confiez-nous le problème<br>avant qu’il ne devienne<br>un <em>appel d’offres</em>',
'home.cta.sub':'Notre meilleur travail commence au stade de la faisabilité, lorsque le périmètre, le montage financier et le modèle d’entretien peuvent encore être conçus ensemble.',

/* --- footer ------------------------------------------------------------ */
'foot.news.title':'Perspectives et opportunités',
'foot.news.sub':'Actualité corporate, marchés, projets et analyses sur le développement international.',
'foot.blurb':'Obras Cullera S.L. — Affaires et Développement International.<br>Identification, structuration, développement et coordination d’opportunités et de projets internationaux.',
'foot.col1':'Groupe','foot.col2':'S’engager','foot.col3':'Bureaux',
'foot.careers':'Carrières','foot.suppliers':'Fournisseurs et partenaires',
'foot.legal':'Mentions légales','foot.privacy':'Confidentialité','foot.cookies':'Cookies','foot.compliance':'Conformité et alertes',
'foot.hq':'Cullera, Valence · Conakry, République de Guinée',

/* --- who we are -------------------------------------------------------- */
'about.hero.title':'Un groupe bâti<br>pour rendre des <em>comptes</em>',
'about.hero.sub':'Obras Cullera est né d’une conviction simple : les pays qui ont le plus besoin d’infrastructures méritent le même standard d’ingénierie, la même gouvernance et le même suivi que ceux qui en disposent déjà.',
'about.story.eyebrow':'Notre histoire',
'about.story.title':'D’une ville côtière<br>valencienne à<br><em>douze pays</em>',
'about.story.p1':'Le groupe a commencé à Cullera comme entreprise de génie civil sur la côte valencienne : digues, voiries municipales, réseaux d’eau. La discipline de cette première décennie, au service de mairies aux budgets modestes et à la mémoire longue, est devenue la culture opérationnelle de tout ce qui a suivi.',
'about.story.p2':'Notre premier mandat international nous a conduits en Afrique de l’Ouest. Nous n’y avons trouvé ni pénurie d’ambition ni pénurie de capitaux, mais un manque de partenaires prêts à rester après la mise en service. Nous avons bâti l’entreprise autour de ce manque.',
'about.story.p3':'Aujourd’hui, Obras Cullera opère comme un groupe de développement intégré : nous aidons à structurer le projet, arrangeons le financement, construisons l’actif et formons ceux qui l’exploiteront — et nous répondons du résultat d’entretien, pas seulement du jalon de construction.',
'about.s1':'Année de création','about.s2':'Salariés et collaborateurs de longue durée','about.s3':'Nationalités au sein du groupe','about.s4':'Bureaux régionaux',
'about.tl.eyebrow':'Jalons','about.tl.title':'Quinze ans,<br>une seule <em>direction</em>',
'about.tl1.t':'Création à Cullera','about.tl1.p':'La société est constituée comme entreprise de génie civil au service des municipalités de la côte valencienne.',
'about.tl2.t':'Premier mandat international','about.tl2.p':'Des travaux d’eau et de drainage municipal en Afrique de l’Ouest marquent le début de la pratique internationale du groupe.',
'about.tl3.t':'Ouverture du bureau de Conakry','about.tl3.p':'Une plateforme permanente en République de Guinée, avec des équipes locales d’ingénierie, d’achats et de relations communautaires.',
'about.tl4.t':'Pratique de financement du développement','about.tl4.p':'Le groupe formalise sa plateforme de conseil en PPP et financement mixte pour structurer des projets avec les banques de développement.',
'about.tl5.t':'Plateforme énergie et eau','about.tl5.p':'La production solaire, la distribution et la production d’eau potable sont consolidées dans une plateforme opérationnelle dédiée.',
'about.tl6.t':'Première Revue d’Impact et de Gouvernance','about.tl6.p':'Le groupe publie des données sociales, environnementales et de passation de marchés auditées pour chaque mandat actif.',
'about.val.eyebrow':'Valeurs et gouvernance','about.val.title':'Six engagements<br>dont nous devons <em>répondre</em>',
'about.val.sub':'Ce ne sont pas des aspirations. Chacun figure dans nos contrats, est audité chaque année et rendu public.',
'about.v1.t':'Intégrité des marchés','about.v1.p':'Registres d’appels d’offres ouverts, intermédiaires déclarés et tolérance zéro pour les paiements de facilitation, sans exception dans aucune juridiction.',
'about.v2.t':'Discipline d’ingénierie','about.v2.p':'Revue indépendante de la conception avant mobilisation et modèle de coût sur le cycle de vie joint à chaque offre technique.',
'about.v3.t':'Contenu local','about.v3.p':'Un plancher contractuel d’emploi local, d’achats locaux et de transfert de technologie sur chaque mandat, mesuré trimestriellement.',
'about.v4.t':'Gérance environnementale','about.v4.p':'Évaluation d’impact alignée sur les Normes de performance de l’IFC, avec des obligations de restauration financées sur le budget de construction.',
'about.v5.t':'Sécurité sans exception','about.v5.p':'Un standard de sécurité unique dans tout le groupe, appliqué aux sous-traitants dans les mêmes termes qu’à nos propres équipes.',
'about.v6.t':'Présence après la remise','about.v6.p':'Chaque contrat comporte une obligation d’exploitation et de maintenance, un plan de pièces de rechange et une équipe locale formée.',
'about.fp.eyebrow':'Où nous opérons','about.fp.title':'Trois régions,<br>un même <em>standard</em>',
'about.fp.sub':'L’Afrique de l’Ouest est notre centre de gravité. La péninsule Ibérique abrite nos fonctions d’ingénierie et corporate. Le Maghreb relie les deux.',
'about.fp1.t':'Afrique de l’Ouest','about.fp1.p':'Guinée, Sénégal, Côte d’Ivoire, Mali, Cap-Vert, Cameroun, Gabon et Guinée équatoriale. Des plateformes pays avec des équipes résidentes d’ingénierie et de relations communautaires.',
'about.fp2.t':'Péninsule Ibérique','about.fp2.p':'Siège du groupe à Cullera, Valence, et un partenariat d’ingénierie portugais. Conception, achats, trésorerie et conformité.',
'about.fp3.t':'Maghreb','about.fp3.p':'Maroc et Mauritanie. Travaux de zones industrielles, grappes solaires et corridor logistique reliant les ports atlantiques au Sahel.',
'about.quote':'Nous préférons perdre un appel d’offres plutôt que de le gagner sur des hypothèses indéfendables devant le ministère qui devra ensuite vivre avec l’ouvrage.',
'about.cta.eyebrow':'Suite','about.cta.title':'Découvrez l’organisation<br>du <em>groupe</em>',

/* --- what we do -------------------------------------------------------- */
'wwd.hero.title':'Le structurer.<br>Le financer. <em>Le construire.</em><br>Le faire durer.',
'wwd.hero.sub':'Quatre plateformes déployables séparément ou combinées sur un même mandat — de la première étude de faisabilité à la vingtième année d’exploitation.',
'wwd.pf.eyebrow':'Nos plateformes','wwd.pf.title':'Des capacités qui<br>s’<em>emboîtent</em>',
'wwd.pf.sub':'La plupart de nos mandats mobilisent au moins deux plateformes. Un corridor routier exige du génie civil et un montage financier ; une grappe solaire exige production, distribution et un exploitant encore formé la cinquième année.',
'wwd.p1.p':'Corridors routiers nationaux et régionaux, ponts et ouvrages d’art, ports et travaux côté piste, hôpitaux, écoles et bâtiments administratifs. Nous intervenons en conception-réalisation et en conception-réalisation-maintenance, et assumons la constructibilité dès la phase de faisabilité.',
'wwd.p2.p':'Production solaire et hybride à l’échelle du réseau, distribution en moyenne tension et électrification rurale, production et distribution d’eau potable, assainissement et déchets solides. Chaque schéma est livré avec comptage, modèle tarifaire et programme de formation de l’exploitant.',
'wwd.p3.p':'Pistes de halage, convoyeurs, aires de stockage et interfaces portuaires pour le secteur minier ; plateformes de transformation, chaîne du froid et zones industrielles pour l’agro-industrie. Nous structurons ces mandats pour qu’une part définie de la transformation — et donc de la marge et des compétences — reste dans le pays hôte.',
'wwd.p4.p':'Structuration et modélisation financière, documentation de concessions et de PPP, financement mixte avec banques de développement, fonds souverains et agences de crédit à l’exportation, et la transparence des marchés qui permet de défendre une opération en public et devant le parlement.',
'wwd.lc.eyebrow':'Cycle de vie du projet','wwd.lc.title':'Six étapes,<br>une équipe <em>responsable</em>',
'wwd.lc.sub':'Le même directeur de projet est responsable depuis l’origination jusqu’à la fin de la période d’entretien. La continuité est le mécanisme de contrôle.',
'wwd.lc1.t':'Origination et faisabilité','wwd.lc1.p':'Analyse de la demande, choix du tracé ou du site, présélection environnementale et sociale, et une première enveloppe de coût honnête — y compris ce qu’il en coûtera de l’entretenir.',
'wwd.lc2.t':'Structuration et financement','wwd.lc2.p':'Architecture contractuelle ou concessive, répartition des risques et arrangement des tranches souveraines, de banques de développement, de crédit à l’exportation et commerciales.',
'wwd.lc3.t':'Conception et revue indépendante','wwd.lc3.p':'Ingénierie de détail, avec une revue de conception par un tiers que nous commandons et communiquons au client avant mobilisation.',
'wwd.lc4.t':'Construction','wwd.lc4.p':'Équipes locales, fournisseurs locaux et un régime de sécurité résident appliqué à l’identique à nos équipes et à nos sous-traitants.',
'wwd.lc5.t':'Mise en service et transfert','wwd.lc5.p':'Essais de performance, dossier des ouvrages exécutés dans la langue de travail de l’exploitant et un stock de pièces de rechange financé.',
'wwd.lc6.t':'Exploitation et maintenance','wwd.lc6.p':'Une période de maintenance contractuelle avec des objectifs de disponibilité publiés et une équipe nationale formée capable de prendre le relais.',
'wwd.ppp.eyebrow':'PPP et financement du développement',
'wwd.ppp.title':'Une opération<br>qu’un ministre peut<br><em>défendre en public</em>',
'wwd.ppp.p1':'Les partenariats public-privé échouent pour des raisons prévisibles : prévisions de demande optimistes, risques transférés à la partie la moins capable de les porter, et entretien traité comme le problème d’un autre. Nous structurons contre ces trois travers.',
'wwd.ppp.p2':'Notre équipe de conseil travaille avec les ministères des finances, des infrastructures et du plan pour produire une documentation qui résiste à un audit, à une alternance politique et à un débat public — parce qu’elle a été écrite en les anticipant.',
'wwd.ppp1.t':'Sources de financement','wwd.ppp1.p':'Banques de développement multilatérales et bilatérales, agences de crédit à l’exportation, fonds souverains et régionaux, et tranches commerciales tarifées sur une répartition réelle des risques.',
'wwd.ppp2.t':'Dispositif de transparence','wwd.ppp2.p':'Registres d’appels d’offres publiés, intermédiaires déclarés, registre ouvert des avenants et revue indépendante annuelle de l’exécution du contrat.',
'wwd.s3':'Partenaires de financement du développement','wwd.s4':'Horizon standard de coût sur cycle de vie',
'wwd.cta.eyebrow':'Suite','wwd.cta.title':'Voir les capacités<br>à l’<em>œuvre</em>',

/* --- projects ---------------------------------------------------------- */
'proj.hero.title':'Des actifs en<br><em>réalisation</em>',
'proj.hero.sub':'Un portefeuille vivant dans douze pays — corridors routiers, hôpitaux, réseaux d’eau, grappes solaires et plateformes industrielles, chacun avec un directeur de projet nommé et une obligation d’entretien publiée.',
'proj.s2':'Mandats actuellement en exécution','proj.s3':'Corridors routiers construits ou réhabilités','proj.s4':'Livrés dans le délai contractuel',
'proj.grid.eyebrow':'Portefeuille','proj.grid.title':'Filtrer par <em>secteur</em>',
'filter.all':'Tous les projets','filter.transport':'Transport','filter.water':'Eau','filter.energy':'Énergie',
'filter.social':'Infrastructure sociale','filter.logistics':'Logistique et industrie','filter.urban':'Développement urbain',
'filter.empty':'Aucun projet dans ce secteur pour l’instant.',
'fact.length':'Longueur','fact.period':'Période','fact.model':'Montage','fact.people':'Personnes desservies','fact.area':'Superficie','fact.capacity':'Capacité','fact.beds':'Lits',
'proj.1.t':'Réhabilitation du corridor Conakry–Kindia','proj.1.loc':'Conakry → Kindia · République de Guinée',
'proj.1.p':'Réhabilitation et élargissement du corridor national desservant l’arrière-pays occidental de la capitale, avec drainage, traversées communautaires et une obligation d’entretien sur dix ans.',
'proj.2.t':'Programme d’eau urbaine de Nzérékoré','proj.2.loc':'Nzérékoré · République de Guinée',
'proj.2.p':'Production, stockage et distribution pour une capitale régionale en croissance, avec comptage, modèle tarifaire et un exploitant municipal formé.',
'proj.3.t':'Plateforme logistique industrielle de Boké','proj.3.loc':'Boké · République de Guinée',
'proj.3.p':'Aires de stockage, interface avec la piste de halage et une zone industrielle viabilisée, conçues pour maintenir dans la région la première transformation et ses emplois.',
'proj.4.t':'Grappe solaire de Nouakchott','proj.4.loc':'Nouakchott · Mauritanie',
'proj.4.p':'Production photovoltaïque à l’échelle du réseau avec stockage de fermeté et une ligne d’évacuation en moyenne tension vers le réseau de distribution de la capitale.',
'proj.5.t':'Hôpital régional de Kankan','proj.5.loc':'Kankan · République de Guinée',
'proj.5.p':'Un hôpital régional de référence de 240 lits avec blocs d’imagerie, chirurgical et de maternité, secours solaire et un contrat de facility management de cinq ans.',
'proj.6.t':'Corridor agricole de Ziguinchor','proj.6.loc':'Ziguinchor · Sénégal',
'proj.6.p':'Pistes de desserte, entreposage frigorifique et une plateforme de marché reliant les producteurs de Casamance au port régional et à Dakar.',
'proj.7.t':'Réaménagement du front de mer de Cullera','proj.7.loc':'Cullera, Valence · Espagne',
'proj.7.p':'Défense côtière, espace public et travaux de mobilité sur le front de mer du siège du groupe, réalisés par phases autour de la saison touristique.',
'proj.8.t':'Terminal céréalier d’Abidjan','proj.8.loc':'Abidjan · Côte d’Ivoire',
'proj.8.p':'Réception, stockage et chargement de céréales en vrac au port, avec une interface prête pour le rail et un compartiment de réserve stratégique nationale.',
'proj.9.t':'Franchissement du Kolenté et protection contre les crues','proj.9.loc':'Kindia · République de Guinée',
'proj.9.p':'Un nouveau franchissement et sa protection contre les crues, phasés pour que le corridor reste ouvert à la circulation pendant toute la durée des travaux.',
'proj.note':'Mandats sélectionnés. Les références complètes, les dossiers techniques et les attestations de clients sont disponibles sur demande pour les contreparties publiques.',
'proj.cta.eyebrow':'Vous envisagez un mandat ?','proj.cta.title':'Chaque projet ici<br>a commencé par une <em>conversation</em>',

/* --- impact ------------------------------------------------------------ */
'imp.hero.title':'Ce que l’ouvrage<br><em>laisse</em> derrière lui',
'imp.hero.sub':'Un projet d’infrastructure est jugé deux fois : à l’inauguration, puis dix ans plus tard. Nous construisons et rendons compte pour le second jugement.',
'imp.fw.eyebrow':'Notre cadre','imp.fw.title':'Quatre obligations,<br>dans <em>chaque</em> contrat<br>que nous signons',
'imp.fw.p1':'L’impact n’est pas un exercice de communication. Sur chaque mandat, nous négocions quatre obligations mesurables dans le contrat lui-même, et nous en rendons compte trimestriellement au client et annuellement en public.',
'imp.fw.p2':'Lorsqu’un objectif n’est pas atteint, la revue le dit. Un cadre qui ne produit que de bonnes nouvelles n’est pas un cadre.',
'imp.fw.link':'Lire la dernière revue',
'imp.o1.t':'01 — Emploi et compétences locales','imp.o1.p':'Un plancher contractuel d’emploi national à tous les grades, des places d’apprentissage liées au programme de travaux et un successeur désigné pour chaque poste expatrié.',
'imp.o2.t':'02 — Achats locaux','imp.o2.p':'Une part minimale des dépenses auprès de fournisseurs enregistrés dans le pays hôte, avec des délais de paiement assez courts pour que les petites entreprises puissent réellement participer.',
'imp.o3.t':'03 — Environnement et restauration','imp.o3.p':'Évaluation alignée sur les Normes de performance de l’IFC, restauration financée sur le budget de construction plutôt que différée, et suivie pendant trois ans après la remise.',
'imp.o4.t':'04 — Communauté et doléances','imp.o4.p':'Un mécanisme de doléances publié avec délais de réponse, des agents de liaison communautaire résidents sur le chantier et des registres d’indemnisation ouverts à l’audit indépendant.',
'imp.sdg.eyebrow':'Alignement','imp.sdg.title':'Rendu compte au regard<br>des <em>ODD</em> de l’ONU',
'imp.sdg.sub':'Six objectifs concentrent le poids de notre portefeuille. Nous rattachons chaque mandat aux objectifs qu’il sert réellement, et nous ne revendiquons pas les autres.',
'imp.s4':'Femmes dans les effectifs du groupe',
'imp.prog.eyebrow':'Programmes','imp.prog.title':'Au-delà de<br>l’<em>emprise du chantier</em>',
'imp.prog.sub':'Quatre programmes permanents accompagnent notre activité de construction, financés par un pourcentage fixe de la valeur du contrat plutôt que par des budgets discrétionnaires.',
'imp.pr1.t':'Académies de chantier','imp.pr1.p':'Formation certifiée en topographie, conduite d’engins et métiers de l’électricité et du génie civil, dispensée sur le chantier et reconnue par l’autorité nationale de formation professionnelle.',
'imp.pr2.t':'Développement des fournisseurs','imp.pr2.p':'Appui à la préqualification, formation à la sécurité et facilités d’avance de trésorerie pour que les entreprises locales puissent répondre à nos lots dans des conditions réalistes.',
'imp.pr3.t':'Points d’eau et de santé','imp.pr3.p':'Forages, bornes-fontaines et rénovation de dispensaires dans les communautés de nos corridors, remis à la commune avec une dotation d’entretien.',
'imp.pr4.t':'Bourses d’ingénierie','imp.pr4.p':'Places universitaires et stages rémunérés pour des étudiants des régions où nous construisons, avec une offre de premier emploi garantie à l’obtention du diplôme.',
'imp.gov.eyebrow':'Gouvernance','imp.gov.title':'La conformité comme<br><em>système d’exploitation</em>',
'imp.gov.sub':'Notre fonction conformité rend compte au conseil, pas à la ligne commerciale. Elle peut arrêter un appel d’offres, et elle l’a déjà fait.',
'imp.g1.t':'Lutte contre la corruption','imp.g1.p':'Tolérance zéro pour les paiements de facilitation, intermédiaires déclarés et diligence raisonnable obligatoire sur la contrepartie avant tout engagement.',
'imp.g2.t':'Canal d’alerte','imp.g2.p':'Un canal exploité en externe, disponible en espagnol, français, anglais et portugais, avec garanties de protection et statistiques de cas publiées.',
'imp.g3.t':'Systèmes certifiés','imp.g3.p':'Qualité ISO 9001, environnement ISO 14001 et santé-sécurité ISO 45001, audités sur tous les territoires d’opération.',
'imp.note':'Les chiffres présentés sont des valeurs indicatives de démonstration pour le lancement de ce site et seront remplacés par les données auditées publiées dans la Revue d’Impact et de Gouvernance du groupe.',
'imp.cta.eyebrow':'Suite','imp.cta.title':'Demandez-nous les<br><em>chiffres</em>',

/* --- news -------------------------------------------------------------- */
'news.hero.title':'Salle de presse<br>et <em>analyses</em>',
'news.hero.sub':'Jalons de projets, publications de gouvernance et analyses sur la façon dont les infrastructures sont réellement financées, construites et maintenues.',
'news.1.date':'12 juin 2026','news.1.loc':'Conakry',
'news.1.t':'Signature de l’accord-cadre pour la réhabilitation du corridor Conakry–Kindia',
'news.1.p':'L’accord porte sur la réhabilitation et l’élargissement de 132 kilomètres de corridor national, avec drainage, traversées communautaires et une obligation d’entretien de dix ans portée par le groupe.',
'news.2.date':'4 mai 2026','news.2.loc':'Kankan',
'news.2.t':'Première pierre de l’Hôpital régional de Kankan, notre premier mandat de santé en Haute-Guinée',
'news.3.date':'21 mars 2026','news.3.loc':'Cullera',
'news.3.t':'Le groupe publie sa première Revue d’Impact et de Gouvernance',
'news.4.date':'18 février 2026','news.4.loc':'Nouakchott',
'news.4.t':'La grappe solaire de Nouakchott atteint son bouclage financier avec trois partenaires de développement',
'news.5.date':'29 janvier 2026','news.5.t':'Souveraineté des infrastructures : à qui appartient le budget d’entretien ?',
'news.6.date':'11 décembre 2025','news.6.t':'Contenu local : comment bâtir des chaînes d’approvisionnement qui restent après le départ de l’entreprise',
'news.7.date':'3 novembre 2025','news.7.loc':'Ziguinchor',
'news.7.t':'Mise en service des premières unités frigorifiques du corridor agricole de Ziguinchor',
'news.all.eyebrow':'Toutes les actualités','news.all.title':'Récemment,<br>du <em>groupe</em>',
'news.note':'Les articles présentés sont un contenu de démonstration préparé pour le lancement. Les demandes presse sont traitées par le service communication du groupe.',
'news.quote':'La question n’est jamais de savoir si un pays peut construire une route. C’est de savoir si, cinq ans plus tard, quelqu’un a reçu le budget et la formation pour la réparer.',
'news.cta.eyebrow':'Presse et demandes','news.cta.title':'Parlez au service<br>de <em>communication</em>',

/* --- contact ----------------------------------------------------------- */
'ct.hero.title':'Parlez au<br><em>groupe</em>',
'ct.hero.sub':'Mandats publics, partenaires de développement, fournisseurs et candidats — chaque demande parvient à une personne nommée, et chaque demande reçoit une réponse.',
'ct.form.eyebrow':'Envoyer une demande','ct.form.title':'Dites-nous ce que<br>vous devez <em>construire</em>',
'ct.f.name':'Nom complet','ct.f.org':'Organisation / ministère','ct.f.country':'Pays','ct.f.subject':'Nature de la demande','ct.f.msg':'Message',
'ct.opt1':'Mandat ou projet du secteur public','ct.opt2':'Financement du développement / montage PPP','ct.opt3':'Enregistrement fournisseur ou sous-traitant','ct.opt4':'Carrières','ct.opt5':'Presse et communication','ct.opt6':'Conformité ou alerte',
'ct.send':'Envoyer la demande',
'ct.note':'Ce formulaire est une démonstration front-end pour la version de lancement ; aucune donnée n’est transmise ni stockée. Il sera relié à la boîte du groupe avant la mise en ligne.',
'ct.off.eyebrow':'Bureaux',
'ct.off1.city':'Cullera, Valence','ct.off1.tag':'Siège','ct.off1.a':'Passeig Marítim · 46400 Cullera, Valence · Espagne',
'ct.off2.city':'Conakry','ct.off2.tag':'Siège régional','ct.off2.a':'Commune de Kaloum · Conakry · République de Guinée',
'ct.off3.city':'Dakar','ct.off3.tag':'Bureau pays','ct.off3.a':'Plateau · Dakar · Sénégal',
'ct.careers.t':'Carrières','ct.careers.p':'Nous recrutons des ingénieurs, économistes de la construction, spécialistes environnementaux et sociaux et professionnels de la finance dans les trois régions. Les candidatures de ressortissants de nos pays hôtes sont prioritaires à tous les grades.',
'ct.sup.t':'Fournisseurs et partenaires','ct.sup.p':'Les fournisseurs locaux peuvent s’inscrire à la préqualification à tout moment. L’inscription est gratuite, ne requiert aucun intermédiaire et aucun paiement n’est jamais demandé en échange d’une prise en considération.',
'ct.compliance':'Vous soupçonnez une irrégularité ? Notre canal d’alerte est exploité en externe et disponible en espagnol, français, anglais et portugais, avec des garanties de protection pour l’auteur du signalement.',
'ct.map.title':'Où nous <em>trouver</em>',
'form.email.ph':'nom@entreprise.com',

  };

  var FR_MAP = {
    'gn':['République de Guinée','Plateforme pays et siège régional. Corridors routiers, hôpitaux, eau urbaine et logistique liée aux mines.'],
    'es':['Espagne','Siège du groupe à Cullera, Valence. Ingénierie, achats et fonctions corporate.'],
    'sn':['Sénégal','Corridors agro-logistiques et programmes d’eau municipaux en Casamance et dans la région de Dakar.'],
    'ci':['Côte d’Ivoire','Manutention de céréales et de conteneurs à proximité du port, et réhabilitation routière dans les villes secondaires.'],
    'mr':['Mauritanie','Grappes solaires à l’échelle du réseau et distribution liée au dessalement autour de Nouakchott.'],
    'ma':['Maroc','Travaux de zones industrielles et partenariats d’ingénierie au service du corridor atlantique.'],
    'c.gn':['République de Guinée','Siège régional, Commune de Kaloum, Conakry. Équipes d’ingénierie, d’achats, de relations communautaires et de conformité.'],
    'c.es':['Espagne','Siège du groupe, Passeig Marítim, Cullera, Valence. Conception, trésorerie, achats et fonctions corporate.'],
    'c.sn':['Sénégal','Bureau pays, Plateau, Dakar. Développement commercial régional et supervision de projets.']
  };

  var EN_EXTRA = {
    'form.ok':'Thank you — your message has been recorded.',
    'form.err':'Please complete the required fields.',
    'ct.ok':'Thank you. Your enquiry has been recorded and will be answered by a named person.'
  };

  var DICT = { es: ES, fr: FR };
  var MAPS = { es: ES_MAP, fr: FR_MAP };
  var LABEL = { en: 'EN', es: 'ES', fr: 'FR' };
  var HTMLLANG = { en: 'en', es: 'es', fr: 'fr' };

  var current = 'en';
  var originals = null;      // key -> English innerHTML
  var mapOriginals = null;   // element -> [name, desc]

  function cache() {
    if (originals) return;
    originals = {};
    document.querySelectorAll('[data-i18n],[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      if (k && !(k in originals)) originals[k] = el.innerHTML;
    });
    // placeholders are attributes, not content, so they cache separately
    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var k = el.getAttribute('data-i18n-ph');
      if (k && !(k in originals)) originals[k] = el.getAttribute('placeholder') || '';
    });
    Object.keys(EN_EXTRA).forEach(function (k) { if (!(k in originals)) originals[k] = EN_EXTRA[k]; });

    mapOriginals = [];
    document.querySelectorAll('[data-i18n-map]').forEach(function (el) {
      mapOriginals.push([el, el.dataset.name, el.dataset.desc, el.querySelector('.mc-name').innerHTML]);
    });
  }

  function textFor(key, lang) {
    if (lang !== 'en' && DICT[lang] && DICT[lang][key] != null) return DICT[lang][key];
    return originals[key];
  }

  function apply(lang) {
    cache();
    document.querySelectorAll('[data-i18n],[data-i18n-html]').forEach(function (el) {
      var k = el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html');
      var v = textFor(k, lang);
      if (v == null) return;
      if (el.innerHTML !== v) el.innerHTML = v;
      if (el.dataset.splitDone) { delete el.dataset.splitDone; }
    });

    document.querySelectorAll('[data-i18n-ph]').forEach(function (el) {
      var v = textFor(el.getAttribute('data-i18n-ph'), lang);
      if (v != null) el.setAttribute('placeholder', v);
    });

    // map legend rows carry their copy in data attributes
    mapOriginals.forEach(function (row) {
      var el = row[0], code = el.dataset.i18nMap;
      var t = (lang !== 'en' && MAPS[lang] && MAPS[lang][code]) ? MAPS[lang][code] : null;
      el.dataset.name = t ? t[0] : row[1];
      el.dataset.desc = t ? t[1] : row[2];
      var n = el.querySelector('.mc-name');
      if (n) n.innerHTML = t ? t[0] : row[3];
    });

    if (window.OCsplit) window.OCsplit(true);

    document.documentElement.lang = HTMLLANG[lang] || 'en';
    var label = document.querySelector('[data-lang-current]');
    if (label) label.textContent = LABEL[lang] || 'EN';
    document.querySelectorAll('.lang-menu button').forEach(function (b) {
      b.classList.toggle('on', b.dataset.lang === lang);
    });

    // refresh the country readout if the map is on this page
    var first = document.querySelector('.map-country.on') || document.querySelector('.map-country');
    var out = document.querySelector('.map-readout');
    if (first && out) out.innerHTML = '<h4>' + first.dataset.name + '</h4><p>' + first.dataset.desc + '</p>';
  }

  function set(lang) {
    if (!lang || lang === current) return;
    current = lang;
    try { localStorage.setItem('oc-lang', lang); } catch (e) {}
    apply(lang);
  }

  function refresh(el) {
    var k = el && (el.getAttribute('data-i18n') || el.getAttribute('data-i18n-html'));
    if (!k) return;
    cache();
    var v = (current !== 'en' && DICT[current] && DICT[current][k] != null) ? DICT[current][k] : (EN_EXTRA[k] || originals[k]);
    if (v != null) el.innerHTML = v;
  }

  function boot() {
    cache();
    var saved = null;
    try { saved = localStorage.getItem('oc-lang'); } catch (e) {}
    if (!saved) {
      var nav = (navigator.language || 'en').slice(0, 2).toLowerCase();
      if (nav === 'es' || nav === 'fr') saved = nav;
    }
    if (saved && saved !== 'en') { current = saved; apply(saved); }
    else { apply('en'); }
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot);
  else boot();

  return { set: set, refresh: refresh, get: function () { return current; } };
})();
