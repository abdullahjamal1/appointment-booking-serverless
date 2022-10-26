from unicodedata import name
import xml.etree.ElementTree as ET

# xml = ET.parse('vast_response.xml').getroot()


def cdata(text):
    return f"![CDATA[{text}]]"

# class Creative:
    

        
    

class Inline:
    def __init__(self, adsystem=None,
        adtitle=None, description=None,
        adservingid=None, impression=None):

        self.__adsystem = adsystem
        self.__adtitle = adtitle
        self.__description = description
        self.__adservingid = adservingid
        self.__impression = impression

    def attach_creative(self):
        return Creative()
    # def attach_adsystem():
    #     return Adsystem()
    
    # def attach_title():
    #     return 

class Ad:
    def __init__(self, id=None):
        self.__id = id

    def attach_inline(self):
        return Inline(self)

    # def attach_wrapper(self):
    #     return Wrapper()

class Error:
    def __init__(self, name=None):
        ad = 'dsd'

class VAST:

    def __init__(self, version='4.0', error_url=None):

        self.__ads = []
        self.__version = version

    def attach_error(self):
        return Error()

    def attach_ad(self, id=None):
        ad = Ad(self, id)
        self.__ads.append(ad)
        return ad

    def xml(self):
        #build vast xml and return
        vast = ET.Element('VAST')
        vast.attrib['version'] = self.__version

        #TODO: for each ad

        for ads in self.__ads:

            Ad = ET.SubElement(vast, 'Ad')
            Ad.attrib['id'] = '12'

            description = "External NCA1C1L1 LinearInlineSkippable ad"
            error_url = 'https://pubads.g.doubleclick.net/pagead/interaction/?ai=B3m76UuB4YuPEIZGuvgSn5LnwCpDVj-sGAAAAEAEgqN27JjgBWLCUgsbXAWDl8ueD1A6yARNnb29nbGVhZHMuZ2l0aHViLmlvugEKNzI4eDkwX3htbMgBBdoBNGh0dHBzOi8vZ29vZ2xlYWRzLmdpdGh1Yi5pby9nb29nbGVhZHMtaW1hLWh0bWw1L3ZzaS_AAgLgAgDqAiUvMTI0MzE5MDk2L2V4dGVybmFsL3NpbmdsZV9hZF9zYW1wbGVz-AKB0h6AAwGQA5oImAOsAqgDAeAEAdIFBhDw3rnMAqAGI4gHAZAHAqgH89EbqAeW2BuoB6qbsQKoB9-fsQLYBwHgBwvACAHSCAYIABACGA3YCAKACgWYCwHQFQH4FgGAFwE&sigh=HEd4sNb1HDQ&label=videoplayfailed[ERRORCODE]'
            impression_url = 'https://securepubads.g.doubleclick.net/pcs/view?xai=AKAOjstRRTna6MNTdZMmYGB5aOlPTf9152WRmK16E4YsAQyb8q98_wdKbcaOD-aJ3B3-zAOvyNnHuHsWmH9ljibSlpggEGA-sjts5Yk7MvycWocm8c9dF0eCrNaezjZXzHVwIEF4oNlQdmDKM6s09DH64MTxQPDWcrPOVc1i269OLlUkYZhk9GtsIKRgVF72ZMOAp6t_dyz80vUtCskgHbElSDJ008X1ADXQpoWrAPUSFfVZmkVxlAAD9A5_PoDWwrvckrQSEYw57XoN58rcLztLyy1PIRX3NlMzDI1J_s5unQmIZ9MEYb28c2yPBBPwvUztGd8JejOwRHZ-&sai=AMfl-YRSLdoqYxs9KX6_SOszk9AUY-rM-5L4haRY_UTX3BR0v4RKTrqEPEPpM6AAtPtClgwzPzvQ1SfEzoWpJZITOOAaXIycj1XPgXaawgsExrUKBNuh-zpCTclza-RdCYarqZrtDw&sig=Cg0ArKJSzGJoncYhQFgqEAE&uach_m=[UACH]&adurl='

            inline = ET.SubElement(Ad, 'InLine')


            ET.SubElement(inline, 'AdSystem').text = "ad system text"
            ET.SubElement(
                inline, 'AdTitle').text = 'External NCA1C1L1 LinearInlineSkippable'
            ET.SubElement(inline, 'Description').text = cdata(description)
            ET.SubElement(inline, 'Error').text = cdata(error_url)
            ET.SubElement(inline, 'Impression').text = cdata(impression_url)

            creatives = ET.SubElement(inline, 'Creatives')

            creatives_obj = [
                {
                'Creative':{
                    'id': '57860459056',
                    'sequence': '1'
                },
                'UniversalAdId': {
                    'idRegistry': "GDFP",
                    'idValue': '57860459056'
                },
                'Linear': {
                    'skipiffset': '00:00:05',
                    'Duration': '00:00:10',
                    'TrackingEvents': [
                        {
                            'event': 'start',
                            'url': 'http://url'
                        }
                    ],
                    'AdParameters': {
                        'custom_param': 'some_value'
                    },
                    'VideoClicks': [
                        {
                                'id': 'GDFP',
                                'url': 'https://pubads.g.doubleclick.net/pcs/click?xai=AKAOjst9yrltkiOx5fq8s1PqaCjbQ--m3Gspql7opMl3Dibcw_10zZpB11ThPKDfkwMiWyr0GrmTUCquqWjYzOl-oYJek7XF2z_Ae9tOTN0XkQZhzvkQn9Uw_ZdS6DWGy2okASUoJolsAY3PEJTTR3npTNWebOzseua3XRPSMv_Imw9_S-nL7tU-XNkXzHHXqeDineCpD1YTE8VYwebroHezzT-ByLq8kQxhS26tzJ2mVr-uJJFIpJvfRG0_zLNHxU0NUwNlKomv87eWkVBBWfCKEGR5LECG6YSf08Two5kLVkithL0l92DwgVZqsv2yS2zc9bwV174x&sai=AMfl-YQmgn4KzC9uIdPj-N-VcT6SWqgBPd6KJBnxSUsc1GmBsLSwXqg1s3vAfOugn6fj2T4Mn9c45KZy1ds9yIInJy4LpXVmj86ly8dQUezA80A6PNcIx-DGdUR-OZn-LPY8aAevMg&sig=Cg0ArKJSzMRLuzhmu03z&fbs_aeid=[gw_fbsaeid]&adurl=https://developers.google.com/interactive-media-ads/docs/vastinspector_dual'
                        }
                    ],
                    'MediaFiles': [
                        {
                            'id': 'GDFP',
                            'delivery': 'progressive',
                            'width': 1280,
                            'height': 720,
                            'type': 'video/mp4',
                            'bitrate': 533,
                                'scalable': True,
                                'maintainAspectRatio': True,
                                'mediaUrl': 'https://redirector.gvt1.com/videoplayback/id/b96674ee53e47835/itag/15/source/gfp_video_ads/requiressl/yes/acao/yes/mime/video%2Fmp4/ctier/L/ip/0.0.0.0/ipbits/0/expire/1652110514/sparams/ip,ipbits,expire,id,itag,source,requiressl,acao,mime,ctier/signature/620C2AD4355B233C9B987FADABB94141C5D9FA7C.281485A78DA65B0774E3E331CFEE32457077F540/key/ck2/file/file.mp4'
                            }

                    ]
                },
                }
            ]

            ET.SubElement(creatives, 'creative')
            ET.SubElement(creatives, 'creative')
        
        ET.indent(vast, space="\t", level=0)
        return ET.tostring(vast, encoding='unicode')


vast = VAST()
vast.attach_ad(id="697200496")

print(str(vast.xml()))
