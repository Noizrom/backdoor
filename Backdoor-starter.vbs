Set objShell = CreateObject("Wscript.Shell")
objShell.CurrentDirectory = "E:\tmp\svelte\backdoor"
objShell.Run "pipenv run python -m server.run",0,True
