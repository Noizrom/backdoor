import subprocess


def extend_api(api_app):
    
    @api_app.get('/send_command')
    def run_command(command: str):
        command = f'pwsh -noprofile -C {command}'
        response = subprocess.run(command , shell=True , capture_output=True)
        return {'stderr': response.stderr , 'stdout':response.stdout}


