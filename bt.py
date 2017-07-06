#coding:utf-8
#pip3 install bcoding
#pip3 install magneturi

# Multi-file Torrent
# ├─announce
# ├─announce-list
# ├─comment
# ├─comment.utf-8
# ├─creation date
# ├─encoding
# ├─info
# │ ├─files
# │ │ ├─length
# │ │ ├─path
# │ │ └─path.utf-8
# │ ├─name
# │ ├─name.utf-8
# │ ├─piece length
# │ ├─pieces
# │ ├─publisher
# │ ├─publisher-url
# │ ├─publisher-url.utf-8
# │ └─publisher.utf-8
# └─nodes

# Single-File Torrent
# ├─announce
# ├─announce-list
# ├─comment
# ├─comment.utf-8
# ├─creation date
# ├─encoding
# ├─info
# │ ├─length
# │ ├─name
# │ ├─name.utf-8
# │ ├─piece length
# │ ├─pieces
# │ ├─publisher
# │ ├─publisher-url
# │ ├─publisher-url.utf-8
# │ └─publisher.utf-8
# └─nodes


import hashlib,base64,time
import urllib
from bcoding import bencode,bdecode
#import magneturi

class BT:
	def __init__(self,path):
		f=open(path,"rb");
		self.torrent=bdecode(f);
		self.info=self.torrent['info'];
		f.close();
		
		# uri=magneturi.from_torrent_file(path);
		# print(uri);
		# paramstr = urllib.parse.urlencode(params)
		# magneturi = 'magnet:?%s' % paramstr
		# print(info["name"]);
		# # info=torrent['info'];
		# # hash_info=bencode(info);
		# # digest=hashlib.sha1(hash_info).digest();
		# # b32hash=base64.b32encode(digest);
		# # magneturl="magnet:?xt=utn:btih:{0}".format(b32hash.decode());
		# # print(magneturl);
		# print("\n\n\n")
		# for key in torrent:
		# 	print(key);

	#种子的建立事件
	def createTime(self):
		if('creation date' in self.torrent):
			create_time=self.torrent['creation date'];
			x = time.localtime(create_time)
			create_time=time.strftime('%Y-%m-%d %H:%M:%S',x);
			return create_time;
		else:
			return "";

	#种子注释
	def comment(self):
		if('comment' in self.torrent):
			comment=self.torrent['comment'];
			return comment;
		else:
			return "";

	#种子编码
	def encoding(self):
		if('encoding' in self.torrent):
			encoding=self.torrent['encoding'];
			return encoding;
		else:
			return '';

	#Tracker的主服务器
	def mainTracker(self):
		if('announce' in self.torrent):
			announce=self.torrent['announce'];
			return announce;
		else:
			return '';

	#Tracker的服务器列表
	def trackerList(self):
		if('announce-list' in self.torrent):
			announce_list=[];
			list=self.torrent['announce-list'];
			for a in list:
				for o in a:
					announce_list.append(o);
			return announce_list;
		else:
			return [];

	#存储的文件夹名称
	def dirName(self):
		if("name" in self.info):
			return self.info["name"];
		else:
			return '';

	#文件信息
	def filesInfo(self):
		files=self.info['files'];
		list=[];
		for obj in files:
			name=obj['path'][0];
			size=obj['length'];
			list.append({"name":name,"size":size});
		return list;

	#得到磁力链接
	def infoHash(self):
		hash_info=bencode(self.info);
		digest=hashlib.sha1(hash_info).digest();
		b32hash=base64.b32encode(digest);
		return b32hash.decode();

	#得到磁力链接
	def magneturi(self):
		return "magnet:?xt=utn:btih:{0}".format(infoHash);

	#文件信息
	def filesPieces(self):
		for key in self.info:
			print(key);
		print("===?");
		pieces=self.info['pieces'];
		

		digest=hashlib.sha1(pieces).digest();
		b32hash=base64.b32encode(digest);
		print(b32hash.decode());

if __name__ == '__main__':
	bt=BT("./1.torrent");
	dirName=bt.dirName();
	print(dirName);
	files=bt.filesInfo();
	print(files);
	infoHash=bt.infoHash();
	print(infoHash);
	mainTracker=bt.mainTracker();
	print(mainTracker);
	# print('magnet:?xt=urn:btih:%s' % infoHash);
	# magneturl="magnet:?xt=utn:btih:{0}".format(infoHash)
	# print(magneturl);
	# bt.filesPieces();
	#magnet:?xt=urn:btih:30EEF98C374400F52DF1420C29204F67F450950F

