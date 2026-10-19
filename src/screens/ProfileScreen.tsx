import React, {useState} from 'react';
import {
  Alert,
  FlatList,
  Pressable,
  StyleSheet,
  Text,
  TextInput,
  View,
  type TextInputProps,
} from 'react-native';
import {useApp} from '../context/AppContext';
import {getSubject, grades, subjects} from '../data/mockData';
import {calcGPA, gradeTone, toLetter, totalScore} from '../utils/grade';
import {colors} from '../theme';
import Card from '../components/Card';
import Badge from '../components/Badge';
import InfoRow from '../components/InfoRow';
import SectionTitle from '../components/SectionTitle';
import EmptyState from '../components/EmptyState';
import type {TabScreenProps} from '../navigation/types';
import type {Student} from '../types';

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_RE = /^0\d{9}$/;

type EditableField = 'name' | 'email' | 'phone';
type FormErrors = Partial<Record<EditableField, string>>;

function ProfileHeader() {
  const {profile, updateProfile} = useApp();
  const [editing, setEditing] = useState(false);
  const [draft, setDraft] = useState<Student>(profile);
  const [errors, setErrors] = useState<FormErrors>({});

  const {gpa, credits} = calcGPA(grades, subjects);

  const startEdit = () => {
    setDraft(profile);
    setErrors({});
    setEditing(true);
  };

  const save = () => {
    const e: FormErrors = {};
    if (!draft.name.trim()) {
      e.name = 'Họ tên không được để trống';
    }
    if (!EMAIL_RE.test(draft.email.trim())) {
      e.email = 'Email không hợp lệ';
    }
    if (!PHONE_RE.test(draft.phone.trim())) {
      e.phone = 'Số điện thoại gồm 10 chữ số, bắt đầu bằng 0';
    }
    setErrors(e);
    if (Object.keys(e).length > 0) {
      return;
    }
    updateProfile({
      name: draft.name.trim(),
      email: draft.email.trim(),
      phone: draft.phone.trim(),
    });
    setEditing(false);
    Alert.alert('Đã lưu', 'Thông tin cá nhân đã được cập nhật.');
  };

  const initials = profile.name
    .split(' ')
    .filter(Boolean)
    .slice(-2)
    .map(w => w[0])
    .join('')
    .toUpperCase();

  return (
    <View>
      <View style={styles.avatarWrap}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>
        <Text style={styles.name}>{profile.name}</Text>
        <Text style={styles.sub}>{profile.id}</Text>
      </View>

      <Card>
        <InfoRow label="Mã sinh viên" value={profile.id} />
        <InfoRow label="Lớp" value={profile.className} />
        <InfoRow label="Ngành học" value={profile.major} />
        <InfoRow label="Khoa" value={profile.faculty} last />
      </Card>

      <SectionTitle
        title="Thông tin liên hệ"
        actionLabel={editing ? undefined : 'Chỉnh sửa'}
        onAction={startEdit}
      />
      {editing ? (
        <Card>
          <Field
            label="Họ tên"
            value={draft.name}
            error={errors.name}
            onChangeText={v => setDraft({...draft, name: v})}
          />
          <Field
            label="Email"
            value={draft.email}
            error={errors.email}
            keyboardType="email-address"
            autoCapitalize="none"
            onChangeText={v => setDraft({...draft, email: v})}
          />
          <Field
            label="Số điện thoại"
            value={draft.phone}
            error={errors.phone}
            keyboardType="phone-pad"
            onChangeText={v => setDraft({...draft, phone: v})}
          />
          <View style={styles.btnRow}>
            <Pressable
              style={[styles.btn, styles.btnGhost]}
              onPress={() => setEditing(false)}>
              <Text style={styles.btnGhostText}>Hủy</Text>
            </Pressable>
            <Pressable style={[styles.btn, styles.btnPrimary]} onPress={save}>
              <Text style={styles.btnPrimaryText}>Lưu thay đổi</Text>
            </Pressable>
          </View>
        </Card>
      ) : (
        <Card>
          <InfoRow label="Họ tên" value={profile.name} />
          <InfoRow label="Email" value={profile.email} />
          <InfoRow label="Số điện thoại" value={profile.phone} last />
        </Card>
      )}

      <SectionTitle title="Kết quả học tập" />
      <View style={styles.gpaRow}>
        <Card style={styles.gpaCard}>
          <Text style={styles.gpaValue}>{gpa == null ? '-' : gpa.toFixed(2)}</Text>
          <Text style={styles.gpaLabel}>GPA (hệ 4)</Text>
        </Card>
        <Card style={styles.gpaCard}>
          <Text style={styles.gpaValue}>{credits}</Text>
          <Text style={styles.gpaLabel}>Tín chỉ tích lũy</Text>
        </Card>
      </View>
      <View style={{height: 10}} />
    </View>
  );
}

function Field({
  label,
  error,
  ...inputProps
}: {label: string; error?: string} & TextInputProps) {
  return (
    <View style={styles.field}>
      <Text style={styles.fieldLabel}>{label}</Text>
      <TextInput
        style={[styles.input, error ? styles.inputError : null]}
        placeholderTextColor={colors.sub}
        {...inputProps}
      />
      {error ? <Text style={styles.error}>{error}</Text> : null}
    </View>
  );
}

export default function ProfileScreen({navigation}: TabScreenProps<'Profile'>) {
  const {resetData} = useApp();

  const confirmReset = () =>
    Alert.alert(
      'Đặt lại dữ liệu',
      'Thông tin cá nhân và trạng thái bài tập sẽ trở về dữ liệu mẫu ban đầu.',
      [
        {text: 'Hủy', style: 'cancel'},
        {text: 'Đặt lại', style: 'destructive', onPress: resetData},
      ],
    );

  return (
    <FlatList
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="handled"
      data={grades}
      keyExtractor={item => item.subjectId}
      ListHeaderComponent={<ProfileHeader />}
      ItemSeparatorComponent={() => <View style={{height: 10}} />}
      renderItem={({item}) => {
        const subject = getSubject(item.subjectId);
        const total = totalScore(item);
        const letter = toLetter(total).letter;
        return (
          <Card
            style={styles.gradeCard}
            onPress={() =>
              navigation.navigate('GradeDetail', {subjectId: item.subjectId})
            }>
            <View style={{flex: 1, marginRight: 10}}>
              <Text style={styles.gradeName} numberOfLines={2}>
                {subject ? subject.name : ''}
              </Text>
              <Text style={styles.sub}>
                {subject ? `${subject.code} • ${subject.credits} tín chỉ` : ''}
              </Text>
            </View>
            {total == null ? (
              <Badge label="Đang học" tone="neutral" />
            ) : (
              <Badge
                label={`${total.toFixed(1)} • ${letter}`}
                tone={gradeTone(total)}
              />
            )}
          </Card>
        );
      }}
      ListEmptyComponent={<EmptyState icon="📄" title="Chưa có kết quả học tập" />}
      ListFooterComponent={
        <Pressable style={styles.reset} onPress={confirmReset}>
          <Text style={styles.resetText}>Đặt lại dữ liệu mẫu</Text>
        </Pressable>
      }
    />
  );
}

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: colors.bg},
  content: {padding: 16, paddingBottom: 32},
  avatarWrap: {alignItems: 'center', marginBottom: 16},
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {color: '#FFFFFF', fontSize: 28, fontWeight: '800'},
  name: {fontSize: 20, fontWeight: '800', color: colors.text, marginTop: 10},
  sub: {fontSize: 12, color: colors.sub, marginTop: 3},
  field: {marginBottom: 12},
  fieldLabel: {fontSize: 13, color: colors.sub, marginBottom: 6},
  input: {
    height: 44,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    color: colors.text,
    fontSize: 15,
    backgroundColor: colors.bg,
  },
  inputError: {borderColor: colors.danger},
  error: {color: colors.danger, fontSize: 12, marginTop: 4},
  btnRow: {flexDirection: 'row', marginTop: 4},
  btn: {
    flex: 1,
    height: 44,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  btnPrimary: {backgroundColor: colors.primary, marginLeft: 6},
  btnPrimaryText: {color: '#FFFFFF', fontWeight: '700'},
  btnGhost: {backgroundColor: colors.bg, marginRight: 6},
  btnGhostText: {color: colors.text, fontWeight: '700'},
  gpaRow: {flexDirection: 'row'},
  gpaCard: {flex: 1, alignItems: 'center', marginHorizontal: 4},
  gpaValue: {fontSize: 24, fontWeight: '800', color: colors.primary},
  gpaLabel: {fontSize: 12, color: colors.sub, marginTop: 2},
  gradeCard: {flexDirection: 'row', alignItems: 'center'},
  gradeName: {fontSize: 15, fontWeight: '700', color: colors.text},
  reset: {alignItems: 'center', paddingVertical: 20},
  resetText: {color: colors.danger, fontWeight: '600'},
});
