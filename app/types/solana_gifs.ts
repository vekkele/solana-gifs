export type SolanaGifs = {
  'version': '0.1.0',
  'name': 'solana_gifs',
  'instructions': [
    {
      'name': 'initialize',
      'accounts': [
        {
          'name': 'baseAccount',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'addGif',
      'accounts': [
        {
          'name': 'baseAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'user',
          'isMut': false,
          'isSigner': true
        }
      ],
      'args': [
        {
          'name': 'gifUrl',
          'type': 'string'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'baseAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'totalGifs',
            'type': 'u64'
          },
          {
            'name': 'gifList',
            'type': {
              'vec': {
                'defined': 'GifItem'
              }
            }
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'GifItem',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'gifUrl',
            'type': 'string'
          },
          {
            'name': 'userAddress',
            'type': 'publicKey'
          }
        ]
      }
    }
  ]
};

export const IDL: SolanaGifs = {
  'version': '0.1.0',
  'name': 'solana_gifs',
  'instructions': [
    {
      'name': 'initialize',
      'accounts': [
        {
          'name': 'baseAccount',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'user',
          'isMut': true,
          'isSigner': true
        },
        {
          'name': 'systemProgram',
          'isMut': false,
          'isSigner': false
        }
      ],
      'args': []
    },
    {
      'name': 'addGif',
      'accounts': [
        {
          'name': 'baseAccount',
          'isMut': true,
          'isSigner': false
        },
        {
          'name': 'user',
          'isMut': false,
          'isSigner': true
        }
      ],
      'args': [
        {
          'name': 'gifUrl',
          'type': 'string'
        }
      ]
    }
  ],
  'accounts': [
    {
      'name': 'baseAccount',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'totalGifs',
            'type': 'u64'
          },
          {
            'name': 'gifList',
            'type': {
              'vec': {
                'defined': 'GifItem'
              }
            }
          }
        ]
      }
    }
  ],
  'types': [
    {
      'name': 'GifItem',
      'type': {
        'kind': 'struct',
        'fields': [
          {
            'name': 'gifUrl',
            'type': 'string'
          },
          {
            'name': 'userAddress',
            'type': 'publicKey'
          }
        ]
      }
    }
  ]
};
