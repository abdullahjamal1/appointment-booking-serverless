import html
import json
import xml.etree.ElementTree as ET
from typing import Dict, List

def cdata(text):
    return f"<![CDATA[{text}]]>"


def json_to_xml(parent: ET.Element, json_vast: Dict):

    #base case
    if(json_vast is None):
        return

    # text
    if 'text' in json_vast:
        parent.text = json_vast['text']

    # attributes {}
    if 'attrib' in json_vast:
        for key, value in json_vast['attrib'].items():
            parent.attrib[key] = value

    # subelements {}
    for key, value in json_vast.items():

        if key == 'text' or key == 'attrib':
            continue
            
        if isinstance(value, list):
            for item in value:
                child = ET.SubElement(parent, key)
                json_to_xml(child, item)
        else:    
            child = ET.SubElement(parent, key)
            json_to_xml(child, value)

creative_video ={
    'attrib':{
        'id': '57860459056',
        'sequence': '1'
    },
    'UniversalAdId': {
        'attrib':{
            'idRegistry': 'GDFP',
            'idValue': '57860459056'
        },
        'text': '57860459056'
    },
    'Linear':{
        'attrib':{
            'skipoffset': "00:00:05"
        },
        'Duration':{
            'text': '00:00;10'
        },
        'TrackingEvents':{
            'Tracking':[
                {
                    'attrib':{
                        'event': 'start'
                    },
                    'text': cdata('START_URL')
                },
                {
                    'attrib':{
                        'event': 'midpoint'
                    },
                    'text': cdata('MIDPOINT_URL')
                },
                {
                    'attrib':{
                        'event': 'complete'
                    },
                    'text': cdata('COMPLETE_URL')
                },
                {
                    'attrib':{
                        'event': 'skip'
                    },
                    'text': cdata('SKIP_URL')
                }
            ]
        },
        'AdParameters':{
            'text': cdata('AD_PARAMETERS')
        },
        'VideoClicks':{
            'ClickThrough':{
                'attrib':{
                    'id': "GDFP"
                },
                'text': cdata('CLICK_THROUGH_URL')
            }
        },
        'MediaFiles':{
            'MediaFile':[
                {
                    'attrib':{
                        'id': 'GDFP',
                        'delivery': 'progressive',
                        'width': '1280',
                        'height': '720',
                        'type': 'video/mp4',
                        'bitrate': '533',
                        'scalable': 'true',
                        'maintainAspectRatio': 'true'
                    },
                    'text': cdata('MEDIA_FILE_URL')
                }
            ]
        }
    }
}

creative_companionad = {
    'attrib':{
        'id': "57857370976",
        'sequence': '1'
    },
    'UniversalAdId':{
        'attrib':{
            'idRegistry': 'unknown'
        }
    },
    'CompanionAds':{
        'Companion':[
            {
                'attrib':{
                    'id': "57857370976",
                    'width': '300',
                    'height': '250'
                },
                'StaticResource':{
                    'attrib':{
                        'creativeType': 'image/png'
                    },
                    'text': cdata('STATIC_RESOURCE_URL')
                },
                'TrackingEvents':{
                    'Tracking':{
                        'attrib':{
                            'event': 'creativeView'
                        },
                        'text': cdata('TRACKING_URL')
                    }
                },
                'CompanionClickThrough':{
                    'text': cdata('COMPANION_CLICK_THROUGH')
                }
            }
        ]
    }
}

json = {

    'attrib':{
        'version': "4.0"
    },
    'Ad':{
        'attrib': {
            'id': '697200496'
        },
        'inline':{
            'AdSystem':{
                'text': 'GDFP'
            },
            'AdTitle':{
                'text': 'External NCA1C1L1 LinearInlineSkippable'
            },
            'Description':{
                'text': cdata('External NCA1C1L1 LinearInlineSkippable ad')
            },
            'Error':{
                'text': cdata('ERROR_URL')
            },
            'Impression':{
                'text': cdata('IMPRESSION_URL')
            },
            'Creatives':{
                'Creative':[
                    creative_video,
                    creative_companionad
                ]
            }
        }
    }
}

vast = ET.Element('VAST')
json_to_xml(vast, json)

ET.indent(vast, space="\t", level=0)
vast_xml_str = html.unescape(ET.tostring(vast, encoding='unicode'))

print(vast_xml_str)