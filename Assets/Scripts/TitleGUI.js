#pragma strict

function Start () {

}
var customSkin:GUISkin;

function OnGUI () {
/*
	GUI.skin = customSkin;

	var ButtonWidth:int = 150;
	var ButtonHeight: int =75;
	var Xposition:int = Screen.width/2;
	var Yposition:int = Screen.height/1.2;
		
if(GUI.Button(Rect(Xposition,Yposition,ButtonWidth,ButtonHeight),"Play Game"))

	{
	Application.LoadLevel("Game");
	}
*/

GUI.skin = customSkin;

var XPosition:int = Screen.width/2;
var YPosition:int = Screen.height/1.2;
var ButtonH:int = 50;
var ButtonW:int = 150;

if(GUI.Button(Rect(XPosition,YPosition,ButtonW,ButtonH),"Play Game"))
{
	Application.LoadLevel("Game");

}
}
