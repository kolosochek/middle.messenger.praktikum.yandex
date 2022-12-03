
export type MessageType = {
    message: [
        author: string,
        time: string,
        date: string,
        text: string,
    ];
}

export type ConversationType = {
    name: string,
    avatar_url: string,
    messages: MessageType[],
    unreadMessages: string,
    chat_id: string,
}

export class APIData {
    public static getData(): ConversationType[] {
        const data = [{
            'name': 'Alex',
            'avatar_url': 'https://i.pravatar.cc/47?img=60',
            'messages': [
                {
                    'message': {
                        'author': 'Alex',
                        'time': '23:13',
                        'date': '09.10.2020',
                        'text': 'Haha that was awesome. C ya bud',
                    }
                }, {
                    'message': {
                        'author': 'Alex',
                        'time': '23:13',
                        'date': '09.10.2020',
                        'text': `Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum bibendum sit amet leo ut elementum. Donec eu nisi nisi. Morbi viverra massa non turpis condimentum molestie. Suspendisse ut gravida mauris. Donec eu facilisis tellus. Maecenas ultricies ornare nunc, non vestibulum arcu tristique at. Maecenas tincidunt odio nisi, at dignissim ante tristique nec. Nunc ac nibh ultricies, sagittis quam non, ornare dui. In egestas pellentesque leo, ac mattis enim porttitor a. Maecenas in venenatis ex. Fusce efficitur vulputate nulla finibus semper. Phasellus pretium augue ut metus dapibus, a varius ipsum elementum.
        
        Donec sollicitudin massa tortor, vitae auctor justo auctor ac. Donec eu lectus sit amet neque posuere tempor. Morbi sem augue, scelerisque ut scelerisque vitae, elementum laoreet sapien. Nullam sed elit fermentum, venenatis ante sed, interdum nibh. Nunc blandit iaculis dolor, vel pretium leo mattis id. Donec eleifend, purus vitae tristique euismod, purus magna dignissim tortor, id iaculis felis tortor id sem. Aliquam ultrices varius suscipit. Etiam est velit, euismod eu erat sit amet, tincidunt fringilla erat. Vivamus id sem accumsan, congue ex eget, iaculis mi. Cras ut mi sodales, consequat orci vitae, eleifend velit. Cras at convallis lectus. Suspendisse nunc tellus, auctor eget sollicitudin ut, dignissim at diam. Sed faucibus scelerisque pretium. Suspendisse ut aliquet leo, nec faucibus ipsum.
        
        Aliquam iaculis lectus eu dignissim volutpat. Vivamus hendrerit laoreet mi, condimentum eleifend sapien vestibulum a. In consequat est mauris, non porta orci pharetra in. Ut efficitur, ex id vestibulum bibendum, libero ante tristique tellus, ut ornare velit felis ut ante. In purus erat, euismod vitae viverra malesuada, dictum at nisl. Nam dapibus lacinia lacus in auctor. Etiam massa lectus, tincidunt ut lectus at, varius porta tortor. Morbi et diam ultrices, varius velit vitae, laoreet leo. Ut vel est vel libero finibus varius vitae at dolor. Maecenas nulla risus, vestibulum sed leo sit amet, mollis bibendum quam. In ut sagittis nibh. Praesent consequat enim at quam mollis luctus. Phasellus ornare ante eget lacus convallis ultrices. Aenean ultrices turpis orci, quis tempus turpis pellentesque sed.
        
        Donec consectetur faucibus lacus vitae rutrum. Duis ullamcorper fringilla risus, vitae ultrices est consectetur vel. Aenean efficitur commodo fermentum. Praesent suscipit id nisl sit amet vehicula. Aliquam iaculis urna vitae dui bibendum volutpat. Donec eu tempor ante. Vivamus quis urna a magna porta hendrerit et eget lectus. Suspendisse potenti.
        
        Nam ante quam, venenatis sed augue nec, pulvinar tincidunt sapien. Vivamus ornare aliquet dolor, et hendrerit massa consequat et. Nulla eget tristique augue, sed efficitur magna. Nullam ut risus nibh. Etiam sapien purus, congue eget rutrum sed, luctus eu est. Nunc dapibus vulputate metus in fermentum. Morbi consectetur sem id justo placerat, non tristique mi ultrices. In consequat odio vel ante pretium, at scelerisque nisi vulputate.
        
        Nam eget sem mollis sem tincidunt mattis. Vivamus eros mauris, aliquam ac faucibus ac, facilisis eget lectus. Nullam eleifend volutpat risus, et sagittis ex dictum a. Pellentesque vel gravida sem. Sed sed congue elit, nec tincidunt lacus. Sed ut elit vitae libero malesuada vehicula sit amet eu dolor. Nulla vitae porttitor magna, non mollis sem. Sed vestibulum leo non lobortis facilisis. Aenean sed nulla mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Pellentesque nibh nulla, tempus vitae blandit vel, rhoncus vel dui. Duis augue nisi, mollis vel elit non, varius pellentesque ex. Phasellus nisi erat, tristique nec aliquet ac, rutrum eu lorem. In sit amet ornare ex. Donec in mauris libero.
        
        Sed quis quam at odio ornare maximus. Nulla malesuada libero quis ipsum aliquam mattis. Ut ornare mauris libero, at laoreet urna lobortis ultrices. Aliquam erat volutpat. Nullam dolor risus, ultrices at molestie id, posuere sed leo. Nulla in massa eget turpis viverra faucibus ac rhoncus nibh. Ut nec erat non sem aliquet congue et vel justo. Etiam aliquam porta viverra. Nulla sodales ex et ante pellentesque, eget accumsan nulla rhoncus. Fusce at malesuada nulla. Nullam tempor, quam non suscipit rhoncus, turpis nunc lacinia odio, ut venenatis nibh velit sed nulla.
        
        Mauris eleifend leo id mattis volutpat. Vestibulum hendrerit, eros nec fermentum pretium, urna nisi cursus dui, sed volutpat magna ligula ac dolor. Ut iaculis tincidunt molestie. Aenean hendrerit molestie quam, eu suscipit lacus vulputate non. Vestibulum tristique metus vitae ante cursus, nec vestibulum purus luctus. Nullam id dignissim orci, quis convallis eros. Pellentesque ac mauris tincidunt quam sollicitudin posuere. Donec vel nulla nec risus aliquam mattis. Sed et hendrerit nulla, ac rhoncus sapien. Donec at euismod mi. Mauris blandit nibh ac orci fermentum, eget ullamcorper neque interdum. Etiam lobortis diam eget facilisis vulputate. Curabitur quis dignissim lectus, id hendrerit elit. Donec pharetra nibh id elit congue, vel feugiat sem dignissim. Nullam tristique suscipit orci, malesuada vehicula dolor bibendum vel.
        
        Praesent placerat velit erat, ultricies venenatis odio tincidunt vel. Donec aliquam lobortis tellus a vulputate. Morbi imperdiet sed nisi eu tristique. Pellentesque cursus aliquet elit, vitae tristique lacus elementum eget. Praesent non sollicitudin quam, a aliquam urna. Quisque vulputate, risus in molestie iaculis, ipsum erat fermentum nulla, quis facilisis dolor lorem quis quam. Mauris a sollicitudin nisi. Pellentesque sed velit sit amet ipsum elementum lobortis sit amet eget ipsum. Suspendisse eget lectus nisl. Proin rutrum eu nisl pretium convallis. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Morbi orci mi, cursus ac massa pellentesque, dictum fermentum velit.`,
                    }
                },
                {
                    'message': {
                        'author': 'Alex',
                        'time': '18:15',
                        'date': '12.10.2020',
                        'text': 'Hey cholo! Wsup?!',
                    }
                },
                {
                    'message': {
                        'author': 'Me',
                        'time': '18:16',
                        'date': '12.10.2020',
                        'text': 'Wsup dawg? How ar ya doin?',
                    }
                },
                {
                    'message': {
                        'author': 'Alex',
                        'time': '18:16',
                        'date': '12.10.2020',
                        'text': 'Dont be silly',
                    },
                }],
            'unreadMessages': 0,
            'chat_id': '0',
        }, {
            'name': 'Marina Skvortsova',
            'avatar_url': 'https://i.pravatar.cc/150?img=25',
            'messages': [{
                'message': {
                    'author': 'Marina Skvortsova',
                    'time': '03:22',
                    'date': '11.10.2020',
                    'text': 'Hi! I am still waiting for your reply. We need to send this code to our client right in time, so I ll wait for your response ASAP!',
                },
            }],
            'unreadMessages': "1",
            'chat_id': '1',
        }, {
            'name': 'Nomad72',
            'avatar_url': 'https://i.pravatar.cc/150?img=69',
            'messages': [{
                'message': {
                    'author': 'Nomad72',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "yeah ;D",
                },
            }],
            'unreadMessages': "5",
            'chat_id': '2',
        }, {
            'name': 'mr. Maloy',
            'avatar_url': 'https://i.pravatar.cc/150?img=66',
            'messages': [
                {
                    'message': {
                        'author': 'mr. Maloy',
                        'time': '04:20',
                        'date': '11.10.2020',
                        'text': 'THUG LIFE :eastcoast:',
                    }
                },
                {
                    'message': {
                        'author': 'Me',
                        'time': '04:20',
                        'date': '11.10.2020',
                        'text': 'There is no swagger like a Mike Jagger!',
                    }
                },
                {
                    'message': {
                        'author': 'mr. Maloy',
                        'time': '18:16',
                        'date': '12.10.2020',
                        'text': 'Aint agree with that',
                    },
                }],
            'unreadMessages': 0,
            'chat_id': '3',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '4',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '5',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '6',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '7',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '8',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '9',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '10',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '11',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '12',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '13',
        }, {
            'name': 'SomeUser',
            'avatar_url': '',
            'messages': [{
                'message': {
                    'author': 'SomeUser',
                    'time': '07:41',
                    'date': '12.10.2020',
                    'text': "IDDQD",
                },
            }],
            'unreadMessages': "1",
            'chat_id': '14',
        }
        ]
        return data;
    }

}

