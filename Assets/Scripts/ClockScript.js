
var isPaused:boolean = false;
var startTime:float; // in seconds
var timeRemaining:float; // in seconds

// var used to draw the bar clock:

var percent:float;
var clockFG:Texture2D;
var clockBG:Texture2D;
var clockFGMaxWidth:float; // the starting width of the foreground bar

// var used to draw the pie chart clock

var rightSide:Texture2D;
var leftSide:Texture2D;
var back:Texture2D;
var blocker:Texture2D;
var shiny: Texture2D;
var finished: Texture2D;


function Start () 
{
guiText.material.color = Color.black;
startTime = Time.time + 120.0;
clockFGMaxWidth = clockFG.width;
}




function Update () 
{
	if(!isPaused)
	{
	DoCountDown();
	}
	
	if(Input.GetKey(KeyCode.Escape))
	{
	Application.Quit();
	}
	
}





function DoCountDown()
{
	timeRemaining = startTime - Time.time;
	percent = timeRemaining/5 * 100;
	
	
	if(timeRemaining < 0)
	{
		timeRemaining = 0;
		isPaused = true;
		TimeIsUp();
	}
	ShowTime();
	Debug.Log("timeRemaining :" + timeRemaining );
		
}





function PauseClock()
{
 isPaused = true;
}



function UnPauseClock()
{

}




function ShowTime()
{
var minutes:int;
var seconds:int;
var timestr:String;

minutes = timeRemaining / 60;
seconds = timeRemaining % 60;

timestr = minutes.ToString() + " : ";
timestr+=seconds.ToString("D2");
guiText.text = timestr; // displays the time to the gui

}




function TimeIsUp()
{
	var winPromptW:int =150;
	var winPromptH:int = 100;
	
	var halfScreenW:float = Screen.width/2;
	var halfScreenH:float = Screen.height/2;
	
	var halfPromptW:float = winPromptW/2;
	var halfPromptH:float = winPromptH/2;
	
}


/*
function Reset(){
startTime = Time.time + 5.0;
}
*/
function OnGUI()
{

	
	var winPromptW:int =150;
	var winPromptH:int = 100;
	
	var halfScreenW:float = Screen.width/2;
	var halfScreenH:float = Screen.height/2;
	
	var halfPromptW:float = winPromptW/2;
	var halfPromptH:float = winPromptH/2;
	var newBarWidth:float = (percent/100) * clockFGMaxWidth; //this is the width that the foreground bar should be.
	var pieClockX:int = 100;
	var pieClockY:int = 50;
	var pieClockW:int = 64;
	var pieClockH:int = 64;
	var gap:int =20; // a spacing variable to help us in position the clock.
	var isPastHalfWay:boolean = percent <50;
	var clockRect:Rect = Rect(0,0,128,128);
	var rot:float= (percent/100) * 360;
	var centerPoint:Vector2 = Vector2(pieClockW,pieClockH);
	var startMatrix:Matrix4x4 = GUI.matrix;
	
	
	
	
	GUI.DrawTexture(clockRect,leftSide,ScaleMode.StretchToFill,true,0);
	GUI.DrawTexture(clockRect,back,ScaleMode.StretchToFill,true,0);
	
	
	if(isPastHalfWay)
	{
		GUIUtility.RotateAroundPivot(-rot-180,centerPoint);
		GUI.DrawTexture(clockRect,leftSide,ScaleMode.StretchToFill,true,0);
		GUI.matrix = startMatrix;
		GUI.DrawTexture(clockRect,blocker,ScaleMode.StretchToFill,true,0);
	}
	
	else
	{
	GUIUtility.RotateAroundPivot(-rot,centerPoint);
	GUI.DrawTexture(clockRect,rightSide,ScaleMode.StretchToFill,true,0);
	GUI.matrix = startMatrix;
	}
	
	if(percent <0)
	{
	GUI.DrawTexture(clockRect,finished,ScaleMode.StretchToFill,true,0);
	GUI.BeginGroup(Rect(halfScreenW-halfPromptW, halfScreenH-halfPromptH,winPromptW*2,winPromptH*2));
	GUI.Box(Rect(0,0,winPromptW+50,winPromptH),"Time is up");
	
	if(GUI.Button(Rect(10,50,80,25),"Play Again"))
	{
		Application.LoadLevel("title");
		
	}
	
	if(GUI.Button(Rect(100,50,80,25),"Quit"))
	{
		Application.Quit();
	}
	GUI.EndGroup();
	}
	GUI.DrawTexture(clockRect,shiny,ScaleMode.StretchToFill,true,0);
	
	GUI.BeginGroup (new Rect (Screen.width - clockBG.width - gap,gap, clockBG.width, clockBG.height));
	GUI.DrawTexture (Rect (0,0, clockBG.width, clockBG.height),clockBG);
	GUI.BeginGroup (new Rect (5, 6, newBarWidth,clockFG.height));
	GUI.DrawTexture (Rect (0,0, clockFG.width, clockFG.height),clockFG);
	GUI.EndGroup ();
	GUI.EndGroup ();
	
	
}
































