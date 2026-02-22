Dim objShell, projectPath
Set objShell = CreateObject("WScript.Shell")
projectPath = CreateObject("Scripting.FileSystemObject").GetParentFolderName(WScript.ScriptFullName)
objShell.Run "cmd /c cd /d """ & projectPath & """ && npm run dev", 0, False
Set objShell = Nothing
