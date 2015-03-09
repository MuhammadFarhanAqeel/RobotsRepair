 

var cols:int = 4; //no. of columns in the card grid
var rows:int = 4; //no. of rows in the card grid
var totalCards:int = cols*rows;
var matchesNeededToWin: int = totalCards * 0.5; // if there are 16 cards then player need to match atleast 8 cards
var matchesMade: int =0; // at the outset the player has not made any match
var cardW:int =100;
var cardH:int =100;
var aCards:Array; // will store all the cards in this array
var aGrid:Array; // this will keep all the records of the dealt and shuffled cards
var aCardsFlipped:ArrayList; // this will store the cards that are flipped on the move
var playerCanClick:boolean; //will use this flag to prevent the player to clicking the buttons that we dont want to
var playerHasWon:boolean = false; //whether or not the player has won. this should probably start with false

class Card extends System.Object
{
var isFaceUp:boolean = false;
var isMatched: boolean = false;
var id : int;

var img:String;

	function Card(img:String,id:int)
	{
	this.img = img;
	this.id = id;
	}
}

function Start()
{
		playerCanClick = true; // We should let the player play,
		// Initialize the arrays as empty lists:
		aCards = new Array();
		aGrid = new Array();
		aCardsFlipped = new ArrayList();

		BuildDeck();
		for(i=0; i<rows; i++)
		{
		aGrid[i] = new Array(); // Create a new, empty array at index i
		for(var j:int=0; j<cols; j++)
			{
            var someNum:int = Random.Range(0,aCards.length);
            aGrid[i][j] = aCards[someNum];
            aCards.RemoveAt(someNum);
			}
	}
}



function BuildGrid()
   {
    GUILayout.BeginVertical();
	    GUILayout.FlexibleSpace(); // used to make the grid spacing flexible vertically
		for(i=0; i<rows; i++)
		{
			GUILayout.BeginHorizontal();
				GUILayout.FlexibleSpace(); // used to make the grid flexible horizontally
				for(j=0; j<cols; j++)
				{
					 var card:Object = aGrid[i][j];
					 var img:String;
					 if(card.isMatched)
				          {
				           img = "blank";
				          }
						else
				          {
						 if (card.isFaceUp)
						 {
						 img = card.img;
						 }
						 else
						 {
						 img = "wrench";
						 }
					 }
					 GUI.enabled = !card.isMatched;
					 if(GUILayout.Button(Resources.Load(img),GUILayout.Width(cardW)))
					 {
					 if (playerCanClick)
						{
					 	FlipCardFaceUp(card);
						}
						Debug.Log(card.img);
					 }
					 GUI.enabled = true;
				}
				GUILayout.FlexibleSpace();
			GUILayout.EndHorizontal();
		}
		GUILayout.FlexibleSpace();
     GUILayout.EndVertical();
   }




function BuildDeck()
{
	var totalRobots:int = 4; //	we got total 4 robots to work with
	var card:Object; // this will store the reference to the card
	var id:int= 0;
	for(var i = 0 ; i < totalRobots;i++)
	{
		var aRobotParts:Array = ["Head","Arm", "Leg"];
		for(var j = 0; j<2 ; j++)
		{
			var someNum:int = Random.Range(0, aRobotParts.length);
			var theMissingPart:String = aRobotParts[someNum];
			aRobotParts.RemoveAt(someNum);
			
			card = new Card("robot" + (i+1) +"Missing" + theMissingPart, id);
			aCards.Add(card);
			
			card = new Card("robot" + (i+1) + theMissingPart, id++);
			aCards.Add(card);
		}
	}
}


function FlipCardFaceUp(card:Card)
{
	card.isFaceUp = true;
	if (aCardsFlipped.IndexOf(card) < 0)
	{
	aCardsFlipped.Add(card);
	
		if(aCardsFlipped.Count == 2)
		{
		playerCanClick = false;
		yield WaitForSeconds(1);
		if(aCardsFlipped[0].id == aCardsFlipped[1].id)
		{
	      // Match!
	      aCardsFlipped[0].isMatched = true;
	      aCardsFlipped[1].isMatched = true;
	      matchesMade++;
	      if(matchesMade >=  matchesNeededToWin)
	      {
	      playerHasWon=true;
	      }
		}
		else
		{
		aCardsFlipped[0].isFaceUp = false;
		aCardsFlipped[1].isFaceUp = false;
		}
		aCardsFlipped = new ArrayList();
		
		playerCanClick = true;
		}
	}
}

function BuildWinPrompt() 
{
	var winPromptW:int =150;
	var winPromptH:int = 100;
	
	var halfScreenW:float = Screen.width/2;
	var halfScreenH:float = Screen.height/2;
	
	var halfPromptW:float = winPromptW/2;
	var halfPromptH:float = winPromptH/2;
	
	GUI.BeginGroup(Rect(halfScreenW-halfPromptW, halfScreenH-halfPromptH,winPromptW,winPromptH));
	GUI.Box(Rect(0,0,winPromptW,winPromptH),"Winner is YOU!!!");
	
	if(GUI.Button(Rect(40,50,80,25),"Play Again"))
	{
		Application.LoadLevel("title");
		playerHasWon = false;
		
	}
	GUI.EndGroup();
}

function OnGUI () {
	GUILayout.BeginArea (Rect (0,0,Screen.width,Screen.height)); 
	BuildGrid();
	if(playerHasWon) 
	{
		BuildWinPrompt();
	}
	GUILayout.EndArea();
}
