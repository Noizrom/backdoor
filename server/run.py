import uvicorn

if __name__ == '__main__':
    HOST = "0.0.0.0"   # '192.168.100.20'
    PORT = 4010
    RELOAD = True       # disable reload in actual production
    
    print(f'available @ http://localhost:4010')
    
    uvicorn.run("server.main:app", host=HOST, port=PORT , reload=RELOAD)
    