# 支援 Range（影片分段讀取）的本機測試伺服器：python3 tests/range_server.py 8811
import os, re, sys
from http.server import ThreadingHTTPServer, SimpleHTTPRequestHandler
class H(SimpleHTTPRequestHandler):
    def log_message(self,*a): pass
    def send_head(self):
        rng=self.headers.get('Range'); path=self.translate_path(self.path)
        if not rng or not os.path.isfile(path): return super().send_head()
        m=re.match(r'bytes=(\d*)-(\d*)',rng); size=os.path.getsize(path)
        a=int(m.group(1)) if m.group(1) else 0; b=int(m.group(2)) if m.group(2) else size-1; b=min(b,size-1)
        f=open(path,'rb'); f.seek(a)
        self.send_response(206); self.send_header('Content-Type',self.guess_type(path)); self.send_header('Accept-Ranges','bytes')
        self.send_header('Content-Range',f'bytes {a}-{b}/{size}'); self.send_header('Content-Length',str(b-a+1)); self.end_headers()
        self._rem=b-a+1; return f
    def copyfile(self,src,out):
        n=getattr(self,'_rem',None)
        if n is None: return super().copyfile(src,out)
        while n>0:
            d=src.read(min(65536,n))
            if not d: break
            out.write(d); n-=len(d)
ThreadingHTTPServer(('127.0.0.1',int(sys.argv[1]) if len(sys.argv)>1 else 8811),H).serve_forever()
