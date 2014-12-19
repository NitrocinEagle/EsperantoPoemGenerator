/*
A	B	C	Ĉ	D	E	F	G	Ĝ	H	Ĥ	I	J	Ĵ	K	L	M	N	O	P	R	S	Ŝ	T	U	Ŭ	V	Z
a	b	c	ĉ	d	e	f	g	ĝ	h	ĥ	i	j	ĵ	k	l	m	n	o	p	r	s	ŝ	t	u	ŭ	v	z
*/
var request1, request2, request3, request4;
var JSON_object1, JSON_object2, JSON_object3, JSON_object4;
var strofesNumber = 4;
function setNumberStrofes(numb)
{
	strofesNumber = parseInt(numb);	
}
function getLastTwoSyllibles(word)
{
	var indexEnd = word.length-1;
	var indexStart = indexEnd;
	while (true)
	{
		var ch = word.charAt(indexStart-1);
		if (ch == 'a' || ch == 'e' || ch == 'o' || ch == 'u' || ch == 'y' || ch == 'i' || ch == 'A' || ch == 'E' || ch == 'O' || ch == 'U' || ch == 'Y' || ch == 'I')
		{
			indexStart--;
			break;
		}
		else
		{
			indexStart--;
		}
	}
	return word.slice(indexStart, indexEnd+1);
}
function createRhyme(poemSentences, templates)
{	
	var lastIndex1 = poemSentences[0].words.length-1;
	var lastIndex2 = poemSentences[2].words.length-1;	
	var lastTwoSyllibles1 = getLastTwoSyllibles(poemSentences[0].words[lastIndex1]);
	var lastTwoSyllibles2 = getLastTwoSyllibles(poemSentences[2].words[lastIndex2]);	
	var word1 = poemSentences[0].words[lastIndex1];
	var word2 = poemSentences[2].words[lastIndex2];
	var poemTempl = new Array();
	parseTemplates(poemTempl, templates);
	var JSON_dictonary;
	var lastMorphemeInTemplate = poemTempl[2].words[poemTempl[2].words.length-1];
	if (lastMorphemeInTemplate == "Noun")
		JSON_dictonary = JSON_object2;
	else if (lastMorphemeInTemplate == "Verb")
			JSON_dictonary = JSON_object1;
	else if (lastMorphemeInTemplate == "Adjective")
		JSON_dictonary = JSON_object3;
	if (lastTwoSyllibles1 != lastTwoSyllibles2)
		while (lastTwoSyllibles1 != lastTwoSyllibles2)
		{
			poemSentences[2].words[lastIndex2] = JSON_dictonary[Math.floor(Math.random()*JSON_dictonary.length)].word;
			word2 = poemSentences[2].words[lastIndex2];
			lastTwoSyllibles2 = getLastTwoSyllibles(word2);
		}
	lastIndex1 = poemSentences[1].words.length-1;
	lastIndex2 = poemSentences[3].words.length-1;	
	lastTwoSyllibles1 = getLastTwoSyllibles(poemSentences[1].words[lastIndex1]);
	lastTwoSyllibles2 = getLastTwoSyllibles(poemSentences[3].words[lastIndex2]);	
	word1 = poemSentences[1].words[lastIndex1];
	word2 = poemSentences[3].words[lastIndex2];
	poemTempl = null; //Does JavaScript have a rubbish collector???
	poemTempl = new Array();
	parseTemplates(poemTempl, templates);
	var JSON_dictonary;
	lastMorphemeInTemplate = poemTempl[3].words[poemTempl[3].words.length-1];
	if (lastMorphemeInTemplate == "Noun")
		JSON_dictonary = JSON_object2;
	else if (lastMorphemeInTemplate == "Verb")
			JSON_dictonary = JSON_object1;
	else if (lastMorphemeInTemplate == "Adjective")
		JSON_dictonary = JSON_object3;
	if (lastTwoSyllibles1 != lastTwoSyllibles2)
		while (lastTwoSyllibles1 != lastTwoSyllibles2)
		{
			poemSentences[3].words[lastIndex2] = JSON_dictonary[Math.floor(Math.random()*JSON_dictonary.length)].word;
			word2 = poemSentences[3].words[lastIndex2];
			lastTwoSyllibles2 = getLastTwoSyllibles(word2);
		}
}
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
function printPoem(form, poemSentences)
{
	for (i = 0; i < poemSentences.length; i++)
	{
		for (j = 0; j < poemSentences[i].words.length; j++)
			document.form.sentences.value += poemSentences[i].words[j] + " ";
		document.form.sentences.value += "\n";
	}
}
function templatize(poemSentences)
{
	for (i = 0; i < poemSentences.length; i++)
		for (j = 0; j < poemSentences[i].words.length; j++)
		{
			var dictonaryURL;
			if (poemSentences[i].words[j] == "Verb")
			{
				dictonaryURL = "./Poem_Generator_files/Dictonary_Verbs.json";
				poemSentences[i].words[j] = JSON_object1[Math.floor(Math.random()*JSON_object1.length)].word;
			}
			else if (poemSentences[i].words[j] == "Noun")
			{
				dictonaryURL = "./Poem_Generator_files/Dictonary_Nouns.json";
				poemSentences[i].words[j] = JSON_object2[Math.floor(Math.random()*JSON_object2.length)].word;
			}
			else if (poemSentences[i].words[j] == "Adjective")
			{
				dictonaryURL = "./Poem_Generator_files/Dictonary_Adjectives.json";
				poemSentences[i].words[j] = JSON_object3[Math.floor(Math.random()*JSON_object3.length)].word;
			}
		}
}
function parseTemplates(poemSentences, templates)
{	
	for (k = 0; k < templates.length; k++)
	{
		var str = templates[k], mas = [], j = 0;
		poemSentences[k] = new Object();
		poemSentences[k].words = new Array();
		for (i = 0; i < str.length; i++) 
			if (str[i] == " ")
			{ 
				j++; 
				continue; 
			}
			else 
				poemSentences[k].words[j] ? poemSentences[k].words[j] += str[i] : poemSentences[k].words[j] = str[i];
	}	
}
function chooseTemplates()
{	
	var templates = new Array(4);
	templates[0] = JSON_object_templates[Math.floor(Math.random()*JSON_object_templates.length)].template;
	templates[1] = JSON_object_templates [Math.floor(Math.random()*JSON_object_templates.length)].template;
	do 
	{
		templates[2] = JSON_object_templates[Math.floor(Math.random()*JSON_object_templates.length)].template;
		if (getLastMorpheme(templates[0]) == getLastMorpheme(templates[2]))
			break;
	} while (true);	
	do 
	{
		templates[3] = JSON_object_templates[Math.floor(Math.random()*JSON_object_templates.length)].template;
		if (getLastMorpheme(templates[1]) == getLastMorpheme(templates[3]))
			break;
	} while (true);	
	return templates;
}
function generatePoem(templatesURL, form)
{
/*
Функция, котороя берет четыре шаблона с рифмой АBАB и подставляет в них слова
Первый шаблон берется любым. Третий берется такой, у которого последняя морфема та же, что и у первого. 
Второй шаблон берется любой, у которого на конце морфема, отличающаяся от морфемы на конце первого и третьего шаблонов. 
Четвертый шаблон с такой же морфемой на конце, что и у второго
*/
	request1 = new XMLHttpRequest();
	request1.open("GET", "./Poem_Generator_files/Dictonary_Verbs.json", false);
	request1.send(null);
	JSON_object1 = JSON.parse(request1.responseText);

	request2 = new XMLHttpRequest();
	request2.open("GET", "./Poem_Generator_files/Dictonary_Nouns.json", false);
	request2.send(null);
	JSON_object2 = JSON.parse(request2.responseText);

	request3 = new XMLHttpRequest();
	request3.open("GET", "./Poem_Generator_files/Dictonary_Adjectives.json", false);
	request3.send(null);
	JSON_object3 = JSON.parse(request3.responseText);

	request_templates = new XMLHttpRequest();
	request_templates.open("GET", "./Poem_Generator_files/Templates.json", false);
	request_templates.send(null);
	JSON_object_templates = JSON.parse(request_templates.responseText);

	var poemSentences = new Array();
	var templates = chooseTemplates();
	parseTemplates(poemSentences, templates);
	templatize(poemSentences);
	createRhyme(poemSentences,templates);
	printPoem(form, poemSentences);
	alert(strofesNumber);
}
