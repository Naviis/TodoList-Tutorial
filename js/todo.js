
/*
*	-------------------------------------------
*
*	Constructeur de l'objet Todo
*	Sert à initialiser notre classe avec ses attributs
*	tout attribut de "this" sera accessible dans nos méthodes
*	le "this" est une référence à l'objet instancié (Todo).
*
*	-------------------------------------------
*/

var Todo =  function(){

	// Le sélecteur css du champs input où seront saisies les tâches
	this.inputSelector = "#form input[type=text]";

	// Le sélecteur css du bouton qui sera cliqué pour enregistrer la tâche
	this.buttonSelector = "#form button";

	// Le sélecteur css de la zone où seront affichées les tâches
	this.taskZoneSelector = "#taskZone";

	// La classe css d'une tâche
	this.taskClass = "task";

}

/*
*	-------------------------------------------
*
*	Définition des méthodes de notre objet Todo
*	en utilisant le prototyping.
*	En simpifié, cela ajoute des méthodes à la fonction.
*	Dans notre cas on définit les méthodes via une syntaxe JSON
*	mais on pourrait tout aussi bien les définir une par une via
*	
*	Todo.prototype.methode = function(){}
*
*	A noter : le nom des méthodes est arbitraire, il n'y a pas
*	de règles particulières. Il ne faut juste pas utiliser des termes réservés
*	comme "class" ou "array".
*
*	-------------------------------------------
*/

Todo.prototype = {
	
	/*
	* Méthode d'initialisation.
	* Cette méthode sera appelée juste après l'instanciation.
	*/

	init : function(){

		/*
		* On appelle la méthode qui va faire en sorte d'écouter l'évènement "click"
		* sur le bouton du formulaire
		*/
		this.handleButton();

	},

	/*
	* Méthode attribuant un écouteur (listener) de l'évènement "click"
	* du bouton.
	*/
	handleButton : function(){

		// On utilise jquery pour écouter le clic
		$( this.buttonSelector ).click(function(event){

			/*
			*   Lors du clic un objet "event" est passé en paramètre de la fonction
			*	Afin d'éviter tout comportement non prévu on empèche le clic d'aller plus loin
			*	via la méthode preventDefault()
			*/
			event.preventDefault();

			/*
			*	Au clic : 
			*	- récupération de la valeur du champs input
			*	- création de l'élément html de la tâche avec la croix de suppression
			*	- injection de cette tâche sur le haut de la pile
			*	- effacement du contenu du champs input
			*/
			var $input = $(this.inputSelector); // Récupération de l'élémnt input qui servira plusieurs fois après. Evite d'aller le recherche à chaque fois dans le DOM. $input et pas input pour indiquer qu'il s'agit d'un objet jquery
			var inputValue = $input.val(); // récupération de la valeur du champs via la fonction "val()" de jQuery

			if( inputValue == "" ) return; // Si la valeur est vide, on return (stoppe l'éxécution de la fonction et évite qu'une tâche vide ne soit créée)

			/*
			* Création de l'élément li. Contrairement à 
			* document.createElement("li") en natif, là nous avons directement un objet jquery
			* qui possède toutes les méthodes nécessaires
			*/
			var $newTask = $("<li></li>");
			$newTask.addClass(this.taskClass); // Ajout de la classe css 
			$newTask.append(inputValue); // On ajoute la valeur du champs input précédemment récupérée

			var $delButton = $("<span></span>"); // Création du bouton de suppression de la tâche
			this.handleDelButton($delButton); // Appel de la méthode qui gèrera le clic sur le bouton
			$newTask.append($delButton); // Ajout au html de la tâche du bouton de suppression qui sera la croix de suppression

			$(this.taskZoneSelector).prepend($newTask); // Insertion du html de la tâche dans la zone prévue via prepend (ajout avant le premier élément du parent )

			this.animateTask($newTask,"in");//Comme dans le css la tâche est en display : none, on va la faire apparaître en fondu

			$input.val(""); // On donne une valeur vide au champs pour effacer son contenu

		}.bind(this)); // le bind(this) permet de conserver la référence à l'objet Todo. Sans ça, le "this" désignerait le bouton dans le contexte de la fonction appelée au clic.

	},

	/*
	* Prend en charge le clic du bouton de suppression d'une tâche
	*/
	handleDelButton : function($btn){
		$btn.click(function(event){
			
			//L'idée est de supprimer la tâche. Autrement dit, dans le DOM le parent du bouton
			$parent = $btn.parent(); // Récupération du parent (.task)

			// Demande de confirmation
			if( confirm("Supprimer la tâche ?") )
				this.animateTask($parent,"out"); // Suppression du DOM de la tâche après un animation

		}.bind(this));
	},

	/*
	* Méthode d'animation d'une tâche
	* En fonction de l'action demandée la décale et l'affiche ou la cache/supprime
 	*/
	animateTask : function($task,action){

		if( "in" == action ){
			$task.fadeIn(); // Apparition en fondu
			$task.animate({"left":0},500); // Animation de la propriété left en 500ms
		}else if( "out" == action ){
			$task.animate({"left":-20},500); // Animation de la propriété left vers la gauche en 500ms
			$(this).fadeOut(function(){ // Disparition en fondu puis grâce au callback à la fin de lanimation, suppression de l'élément du DOM
				$task.remove();
			});						
		}
		
	}


}