
/**
 * Mock data for Rack Overview Layout Configuration
 * Hierarchical structure: Face -> Group -> Rack -> Slot
 */

export const initialOverviewLayout = {
  id: 'LAYOUT-H100-SMT-01',
  location: 'F01 - 2F - Cleanroom 01',
  product_line: 'NVIDIA H100',
  selected_group_name: 'Group A (SMT)',
  faces: [
    {
      id: 'face-1',
      face_name: 'Face Mặt Trước A',
      groups: [
        {
          id: 'grp-1',
          group_name: 'Group SMT Line 01',
          racks: [
            {
              id: 'rack-1',
              rack_name: 'RCK-A01',
              order: 1,
              slots: [
                {
                  id: 's-101',
                  slot_number: '01',
                  slot_name: 'SLOT-GPU-01',
                  status: 'approved',
                  ip_address: '192.168.1.101',
                  device_type: 'GPU Accelerator'
                },
                {
                  id: 's-102',
                  slot_number: '02',
                  slot_name: 'SLOT-GPU-02',
                  status: 'approved',
                  ip_address: '192.168.1.102',
                  device_type: 'GPU Accelerator'
                },
                {
                  id: 's-103',
                  slot_number: '03',
                  slot_name: 'SLOT-SW-01',
                  status: 'rejected',
                  ip_address: '192.168.1.103',
                  device_type: 'Top-of-Rack Switch'
                }
              ]
            },
            {
              id: 'rack-2',
              rack_name: 'RCK-A02',
              order: 2,
              slots: [
                {
                  id: 's-201',
                  slot_number: '01',
                  slot_name: 'SLOT-PWR-01',
                  status: 'approved',
                  ip_address: '192.168.1.104',
                  device_type: 'Power Distribution'
                },
                {
                  id: 's-202',
                  slot_number: '02',
                  slot_name: 'SLOT-CTRL-01',
                  status: 'approved',
                  ip_address: '192.168.1.105',
                  device_type: 'Edge Controller'
                }
              ]
            }
          ]
        },
        {
          id: 'grp-2',
          group_name: 'Group SMT Line 02',
          racks: [
            {
              id: 'rack-3',
              rack_name: 'RCK-A03',
              order: 1,
              slots: [
                {
                  id: 's-301',
                  slot_number: '01',
                  slot_name: 'SLOT-OPT-01',
                  status: 'approved',
                  ip_address: '192.168.1.106',
                  device_type: 'Optical Gateway'
                },
                {
                  id: 's-302',
                  slot_number: '02',
                  slot_name: 'SLOT-OPT-02',
                  status: 'rejected',
                  ip_address: '192.168.1.107',
                  device_type: 'Optical Gateway'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      id: 'face-2',
      face_name: 'Face Mặt Sau B',
      groups: [
        {
          id: 'grp-3',
          group_name: 'Group ICT Testing',
          racks: [
            {
              id: 'rack-4',
              rack_name: 'RCK-B01',
              order: 1,
              slots: [
                {
                  id: 's-401',
                  slot_number: '01',
                  slot_name: 'SLOT-TST-01',
                  status: 'approved',
                  ip_address: '172.16.20.11',
                  device_type: 'ICT Testing Station'
                },
                {
                  id: 's-402',
                  slot_number: '02',
                  slot_name: 'SLOT-TST-02',
                  status: 'approved',
                  ip_address: '172.16.20.12',
                  device_type: 'ICT Testing Station'
                },
                {
                  id: 's-403',
                  slot_number: '03',
                  slot_name: 'SLOT-TST-03',
                  status: 'approved',
                  ip_address: '172.16.20.13',
                  device_type: 'ICT Testing Station'
                }
              ]
            }
          ]
        }
      ]
    }
  ],
  updated_at: '2026-11-07 08:30:00'
};
