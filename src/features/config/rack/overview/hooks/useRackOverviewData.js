import { useState, useMemo, useCallback, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { initialOverviewLayout } from '../mock/rackOverviewMockData';
import {
  LOCATION_OPTIONS,
  PRODUCT_LINE_OPTIONS,
  GROUP_NAME_OPTIONS
} from '../constants/rackOverviewConstants';

export default function useRackOverviewData() {
  const { t } = useTranslation('rack');

  // Top Filters
  const [location, setLocation] = useState(initialOverviewLayout.location || LOCATION_OPTIONS[0]);
  const [productLine, setProductLine] = useState(initialOverviewLayout.product_line || PRODUCT_LINE_OPTIONS[0]);
  const [selectedGroupName, setSelectedGroupName] = useState(initialOverviewLayout.selected_group_name || GROUP_NAME_OPTIONS[0]);

  // Main Canvas Hierarchical Data: Faces -> Groups -> Racks -> Slots
  const [faces, setFaces] = useState(initialOverviewLayout.faces);

  // Modals & Selection States
  const [isStructureModalOpen, setIsStructureModalOpen] = useState(false);
  const [isRenameGroupModalOpen, setIsRenameGroupModalOpen] = useState(false);
  const [addSlotTarget, setAddSlotTarget] = useState(null); // { faceId, groupId, rackId }
  const [deleteTarget, setDeleteTarget] = useState(null);   // { type, faceId, groupId, rackId, slotId, name }
  const [editingTarget, setEditingTarget] = useState(null); // { type, faceId, groupId, rackId, slotId, currentName }
  const [selectedItem, setSelectedItem] = useState(null);   // Clicked item for property inspector

  // Toast
  const [toast, setToast] = useState(null);

  const showToast = useCallback((message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  // Dynamic KPI Calculations
  const totalFaces = faces.length;

  const totalGroups = useMemo(() => {
    return faces.reduce((acc, face) => acc + (face.groups?.length || 0), 0);
  }, [faces]);

  const totalRacks = useMemo(() => {
    return faces.reduce((acc, face) => {
      return (
        acc +
        (face.groups || []).reduce((grpAcc, grp) => grpAcc + (grp.racks?.length || 0), 0)
      );
    }, 0);
  }, [faces]);

  const { totalSlots, approvedSlotsCount } = useMemo(() => {
    let slotsTotal = 0;
    let approvedTotal = 0;

    faces.forEach((face) => {
      (face.groups || []).forEach((grp) => {
        (grp.racks || []).forEach((rack) => {
          (rack.slots || []).forEach((slot) => {
            slotsTotal += 1;
            if (slot.status === 'approved') {
              approvedTotal += 1;
            }
          });
        });
      });
    });

    return { totalSlots: slotsTotal, approvedSlotsCount: approvedTotal };
  }, [faces]);

  // ========================
  // CRUD OPERATIONS: FACE
  // ========================
  const handleAddFace = useCallback((customName) => {
    const faceNumber = faces.length + 1;
    const newFace = {
      id: `face-${Date.now().toString().slice(-4)}`,
      face_name: customName || `Face Mặt ${String.fromCharCode(64 + faceNumber)}`,
      groups: []
    };

    setFaces((prev) => [...prev, newFace]);
    showToast(t('overview.toast.addFaceSuccess', { name: newFace.face_name }), 'success');
  }, [faces.length, showToast, t]);

  const handleEditFace = useCallback((faceId, newName) => {
    if (!newName?.trim()) return;

    setFaces((prev) =>
      prev.map((face) =>
        face.id === faceId ? { ...face, face_name: newName.trim() } : face
      )
    );
    showToast(t('overview.toast.editFaceSuccess'), 'success');
  }, [showToast, t]);

  const handleDeleteFace = useCallback((faceId) => {
    setFaces((prev) => prev.filter((face) => face.id !== faceId));
    showToast(t('overview.toast.deleteFaceSuccess'), 'success');
  }, [showToast, t]);

  // ========================
  // CRUD OPERATIONS: GROUP
  // ========================
  const handleAddGroup = useCallback((faceId, customName) => {
    const targetFaceId = faceId || faces[0]?.id;
    if (!targetFaceId) {
      showToast(t('overview.toast.needFaceWarning'), 'warning');
      return;
    }

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === targetFaceId) {
          const groupIndex = (face.groups?.length || 0) + 1;
          const newGroup = {
            id: `grp-${Date.now().toString().slice(-4)}`,
            group_name: customName || `Group SMT Line ${String(groupIndex).padStart(2, '0')}`,
            racks: []
          };
          return {
            ...face,
            groups: [...(face.groups || []), newGroup]
          };
        }
        return face;
      })
    );

    showToast(t('overview.toast.addGroupSuccess'), 'success');
  }, [faces, showToast, t]);

  const handleEditGroup = useCallback((faceId, groupId, newName) => {
    if (!newName?.trim()) return;

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) =>
              grp.id === groupId ? { ...grp, group_name: newName.trim() } : grp
            )
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.editGroupSuccess'), 'success');
  }, [showToast, t]);

  const handleDeleteGroup = useCallback((faceId, groupId) => {
    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).filter((grp) => grp.id !== groupId)
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.deleteGroupSuccess'), 'success');
  }, [showToast, t]);

  // ========================
  // CRUD OPERATIONS: RACK
  // ========================
  const handleAddRack = useCallback((faceId, groupId, customName) => {
    // Determine target Face & Group
    let targetFaceId = faceId;
    let targetGroupId = groupId;

    if (!targetFaceId || !targetGroupId) {
      const firstFaceWithGroup = faces.find((f) => f.groups?.length > 0);
      if (firstFaceWithGroup) {
        targetFaceId = firstFaceWithGroup.id;
        targetGroupId = firstFaceWithGroup.groups[0].id;
      } else {
        showToast(t('overview.toast.needFaceGroupWarning'), 'warning');
        return;
      }
    }

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === targetFaceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === targetGroupId) {
                const rackIndex = (grp.racks?.length || 0) + 1;
                const newRack = {
                  id: `rack-${Date.now().toString().slice(-4)}`,
                  rack_name: customName || `RCK-A${String(rackIndex).padStart(2, '0')}`,
                  order: rackIndex,
                  slots: []
                };
                return {
                  ...grp,
                  racks: [...(grp.racks || []), newRack]
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );

    showToast(t('overview.toast.addRackSuccess'), 'success');
  }, [faces, showToast, t]);

  const handleEditRack = useCallback((faceId, groupId, rackId, newName) => {
    if (!newName?.trim()) return;

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                return {
                  ...grp,
                  racks: (grp.racks || []).map((rack) =>
                    rack.id === rackId ? { ...rack, rack_name: newName.trim() } : rack
                  )
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.editRackSuccess'), 'success');
  }, [showToast, t]);

  const handleDeleteRack = useCallback((faceId, groupId, rackId) => {
    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                return {
                  ...grp,
                  racks: (grp.racks || []).filter((rack) => rack.id !== rackId)
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.deleteRackSuccess'), 'success');
  }, [showToast, t]);

  // ========================
  // CRUD OPERATIONS: SLOT
  // ========================
  const handleOpenAddSlotModal = useCallback((faceId, groupId, rackId) => {
    setAddSlotTarget({ faceId, groupId, rackId });
  }, []);

  const handleConfirmAddSlot = useCallback(({ slot_number, status, slot_name, ip_address }) => {
    if (!addSlotTarget) return;
    const { faceId, groupId, rackId } = addSlotTarget;

    const newSlot = {
      id: `s-${Date.now().toString().slice(-4)}`,
      slot_number: slot_number || '01',
      slot_name: slot_name || `SLOT-${String(slot_number || '01').padStart(2, '0')}`,
      status: status || 'approved',
      ip_address: ip_address || `192.168.1.${Math.floor(Math.random() * 200 + 10)}`,
      device_type: 'AutoLine Device'
    };

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                return {
                  ...grp,
                  racks: (grp.racks || []).map((rack) => {
                    if (rack.id === rackId) {
                      return {
                        ...rack,
                        slots: [...(rack.slots || []), newSlot]
                      };
                    }
                    return rack;
                  })
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );

    setAddSlotTarget(null);
    showToast(t('overview.toast.addSlotSuccess', { num: newSlot.slot_number, status: newSlot.status.toUpperCase() }), 'success');
  }, [addSlotTarget, showToast, t]);

  const handleEditSlot = useCallback((faceId, groupId, rackId, slotId, updatedFields) => {
    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                return {
                  ...grp,
                  racks: (grp.racks || []).map((rack) => {
                    if (rack.id === rackId) {
                      return {
                        ...rack,
                        slots: (rack.slots || []).map((s) =>
                          s.id === slotId ? { ...s, ...updatedFields } : s
                        )
                      };
                    }
                    return rack;
                  })
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.editSlotSuccess'), 'success');
  }, [showToast, t]);

  const handleDeleteSlot = useCallback((faceId, groupId, rackId, slotId) => {
    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                return {
                  ...grp,
                  racks: (grp.racks || []).map((rack) => {
                    if (rack.id === rackId) {
                      return {
                        ...rack,
                        slots: (rack.slots || []).filter((s) => s.id !== slotId)
                      };
                    }
                    return rack;
                  })
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.deleteSlotSuccess'), 'success');
  }, [showToast, t]);

  // ========================
  // REORDERING / DRAG & DROP
  // ========================
  const handleSwapRacks = useCallback((faceId, groupId, sourceRackId, targetRackId) => {
    if (sourceRackId === targetRackId) return;

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                const racks = [...(grp.racks || [])];
                const sIdx = racks.findIndex((r) => r.id === sourceRackId);
                const tIdx = racks.findIndex((r) => r.id === targetRackId);
                if (sIdx !== -1 && tIdx !== -1) {
                  const temp = racks[sIdx];
                  racks[sIdx] = racks[tIdx];
                  racks[tIdx] = temp;
                }
                return { ...grp, racks };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.swapRacksSuccess'), 'info');
  }, [showToast, t]);

  const handleSwapSlots = useCallback((faceId, groupId, rackId, sourceSlotId, targetSlotId) => {
    if (sourceSlotId === targetSlotId) return;

    setFaces((prev) =>
      prev.map((face) => {
        if (face.id === faceId) {
          return {
            ...face,
            groups: (face.groups || []).map((grp) => {
              if (grp.id === groupId) {
                return {
                  ...grp,
                  racks: (grp.racks || []).map((rack) => {
                    if (rack.id === rackId) {
                      const slots = [...(rack.slots || [])];
                      const sIdx = slots.findIndex((s) => s.id === sourceSlotId);
                      const tIdx = slots.findIndex((s) => s.id === targetSlotId);
                      if (sIdx !== -1 && tIdx !== -1) {
                        const temp = slots[sIdx];
                        slots[sIdx] = slots[tIdx];
                        slots[tIdx] = temp;
                      }
                      return { ...rack, slots };
                    }
                    return rack;
                  })
                };
              }
              return grp;
            })
          };
        }
        return face;
      })
    );
    showToast(t('overview.toast.swapSlotsSuccess'), 'info');
  }, [showToast, t]);

  // ========================
  // GLOBAL ACTIONS & SHORTCUTS
  // ========================
  const handleSaveLayout = useCallback(() => {
    showToast(t('overview.toast.saveLayoutSuccess', { name: selectedGroupName }), 'success');
  }, [selectedGroupName, showToast, t]);

  const handleReloadDatabase = useCallback(() => {
    setFaces(initialOverviewLayout.faces);
    setLocation(initialOverviewLayout.location);
    setProductLine(initialOverviewLayout.product_line);
    setSelectedGroupName(initialOverviewLayout.selected_group_name);
    showToast(t('overview.toast.reloadSuccess'), 'info');
  }, [showToast, t]);

  const handleRenameSelectedGroup = useCallback((newName) => {
    if (!newName?.trim()) return;
    setSelectedGroupName(newName.trim());
    setIsRenameGroupModalOpen(false);
    showToast(t('overview.toast.renameGroupSuccess', { name: newName.trim() }), 'success');
  }, [showToast, t]);

  // Keyboard Shortcuts Listener: Ctrl+S, Esc, Delete
  useEffect(() => {
    const handleKeyDown = (e) => {
      // Ctrl + S (or Cmd + S) -> Save Layout
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 's') {
        e.preventDefault();
        handleSaveLayout();
      }
      // Esc -> Close modals or deselect
      if (e.key === 'Escape') {
        setIsStructureModalOpen(false);
        setIsRenameGroupModalOpen(false);
        setAddSlotTarget(null);
        setDeleteTarget(null);
        setEditingTarget(null);
        setSelectedItem(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [handleSaveLayout]);

  return {
    // Filters
    location,
    setLocation,
    productLine,
    setProductLine,
    selectedGroupName,
    setSelectedGroupName,

    // Hierarchy Canvas Data
    faces,
    setFaces,

    // KPI Counters
    totalFaces,
    totalGroups,
    totalRacks,
    totalSlots,
    approvedSlotsCount,

    // CRUD Handlers
    handleAddFace,
    handleEditFace,
    handleDeleteFace,

    handleAddGroup,
    handleEditGroup,
    handleDeleteGroup,

    handleAddRack,
    handleEditRack,
    handleDeleteRack,

    handleOpenAddSlotModal,
    handleConfirmAddSlot,
    handleEditSlot,
    handleDeleteSlot,

    // Drag & Drop
    handleSwapRacks,
    handleSwapSlots,

    // Header Actions
    handleSaveLayout,
    handleReloadDatabase,
    handleRenameSelectedGroup,

    // Modals & Target States
    isStructureModalOpen,
    setIsStructureModalOpen,
    isRenameGroupModalOpen,
    setIsRenameGroupModalOpen,
    addSlotTarget,
    setAddSlotTarget,
    deleteTarget,
    setDeleteTarget,
    editingTarget,
    setEditingTarget,
    selectedItem,
    setSelectedItem,

    // Toast
    toast
  };
}

