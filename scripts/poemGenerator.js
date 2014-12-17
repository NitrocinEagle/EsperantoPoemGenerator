/*A	B	C	Ĉ	D	E	F	G	Ĝ	H	Ĥ	I	J	Ĵ	K	L	M	N	O	P	R	S	Ŝ	T	U	Ŭ	V	Z
a	b	c	ĉ	d	e	f	g	ĝ	h	ĥ	i	j	ĵ	k	l	m	n	o	p	r	s	ŝ	t	u	ŭ	v	z
*/
function getLastMorpheme(strTemplate)
{
	var lastMorpheme = "";
	var ch;
	var k = 1;
	while (ch != ' ')
	{
		ch = strTemplate.charAt(strTemplate.length - k);
		lastMorpheme += ch;
		k++;
	}
	return lastMorpheme;
}
function lol(templatesURL, form)
{
/*
Функция, котороя берет четыре шаблона с рифмой ВААВ и подставляет в них слова
Первый шаблон берется любым. Третий берется такой, у которого последняя морфема та же, что и у первого. Второй шаблон берется любой, у которого на конце морфема, отличающаяся от морфемы на конце первого и третьего шаблонов. Четвертый шаблон с такой же морфемой на конце, что и у второго
*/	
	var request = new XMLHttpRequest();
	request.open("GET", templatesURL, false);
	request.send(null);
	var JSON_object = JSON.parse(request.responseText);
	var templates = new Array(4);
	templates[0] = JSON_object[Math.floor(Math.random()*JSON_object.length)].template;
	templates[1] = JSON_object[Math.floor(Math.random()*JSON_object.length)].template;
	do 
	{
		templates[2] = JSON_object[Math.floor(Math.random()*JSON_object.length)].template;
		if (getLastMorpheme(templates[0]) == getLastMorpheme(templates[2]))
			break;
	} while (true);
	do 
	{
		templates[3] = JSON_object[Math.floor(Math.random()*JSON_object.length)].template;
		if (getLastMorpheme(templates[1]) == getLastMorpheme(templates[3]))
			break;
	} while (true);
	
	for (i = 0; i < templates.length; i++)
	{		
		document.form.sentences.value += i + "-й шаблон - " + templates[i] + "\n";
	}	
}
