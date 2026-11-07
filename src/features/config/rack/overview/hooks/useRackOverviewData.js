import { useState, useMemo, useCallback, useEffect } from 'react';
import { initialOverviewLayout } from '../mock/rackOverviewMockData';
import {
  LOCATION_OPTIONS,
  PRODUCT_LINE_OPTIONS,
  GROUP_NAME_OPTIONS
} from '../constants/rackOverviewConstants';

export default function useRackOverviewData() {
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
    showToast(`Đã thêm mới ${newFace.face_name}!`, 'success');
  }, [faces.length, showToast]);

  const handleEditFace = useCallback((faceId, newName) => {
    if (!newName?.trim()) return;

    setFaces((prev) =>
      prev.map((face) =>
        face.id === faceId ? { ...face, face_name: newName.trim() } : face
      )
    );
    showToast('Đã đổi tên Face thành công!', 'success');
  }, [showToast]);

  const handleDeleteFace = useCallback((faceId) => {
    setFaces((prev) => prev.filter((face) => face.id !== faceId));
    showToast('Đã xóa Face thành công!', 'success');
  }, [showToast]);

  // ========================
  // CRUD OPERATIONS: GROUP
  // ========================
  const handleAddGroup = useCallback((faceId, customName) => {
    const targetFaceId = faceId || faces[0]?.id;
    if (!targetFaceId) {
      showToast('Vui lòng tạo ít nhất 1 Face trước khi thêm Group!', 'warning');
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

    showToast('Đã thêm mới Group lồng vào Face!', 'success');
  }, [faces, showToast]);

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
    showToast('Đã cập nhật tên Group thành công!', 'success');
  }, [showToast]);

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
    showToast('Đã xóa Group thành công!', 'success');
  }, [showToast]);

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
        showToast('Vui lòng tạo Face và Group trước khi thêm Rack!', 'warning');
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

    showToast('Đã thêm mới tủ Rack lồng vào Group!', 'success');
  }, [faces, showToast]);

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
    showToast('Đã cập nhật tên Rack thành công!', 'success');
  }, [showToast]);

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
    showToast('Đã xóa tủ Rack thành công!', 'success');
  }, [showToast]);

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
    showToast(`Đã thêm Slot ${newSlot.slot_number} [${newSlot.status.toUpperCase()}] thành công!`, 'success');
  }, [addSlotTarget, showToast]);

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
    showToast('Đã cập nhật thông tin Slot!', 'success');
  }, [showToast]);

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
    showToast('Đã xóa Slot khỏi Rack!', 'success');
  }, [showToast]);

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
    showToast('Đã đổi thứ tự cột Rack thành công!', 'info');
  }, [showToast]);

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
    showToast('Đã hoán đổi vị trí Slot tức thì!', 'info');
  }, [showToast]);

  // ========================
  // GLOBAL ACTIONS & SHORTCUTS
  // ========================
  const handleSaveLayout = useCallback(() => {
    showToast(`Đã lưu toàn bộ bố cục Layout [${selectedGroupName}] vào Database!`, 'success');
  }, [selectedGroupName, showToast]);

  const handleReloadDatabase = useCallback(() => {
    setFaces(initialOverviewLayout.faces);
    setLocation(initialOverviewLayout.location);
    setProductLine(initialOverviewLayout.product_line);
    setSelectedGroupName(initialOverviewLayout.selected_group_name);
    showToast('Đã tải lại bố cục mới nhất từ Database!', 'info');
  }, [showToast]);

  const handleRenameSelectedGroup = useCallback((newName) => {
    if (!newName?.trim()) return;
    setSelectedGroupName(newName.trim());
    setIsRenameGroupModalOpen(false);
    showToast(`Đã đổi tên Group thành: "${newName.trim()}"!`, 'success');
  }, [showToast]);

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

