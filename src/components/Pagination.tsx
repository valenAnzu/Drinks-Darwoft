// components/Pagination.tsx
import React from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) return null;

  let pagesToShow: number[] = [];

  if (currentPage <= 2) {
    // Al inicio → 1, 2, 3, last
    pagesToShow = [1, 2, 3, totalPages];
  } else if (currentPage >= totalPages - 1) {
    // Al final → 1, last-2, last-1, last
    pagesToShow = [totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
  } else {
    // En el medio → 1, prev, actual, next, last
    pagesToShow = [currentPage - 1, currentPage, currentPage + 1, totalPages];
  }



  return (
    <View style={styles.paginationContainer}>
      {/* Flecha anterior */}
      <Pressable
        onPress={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        style={styles.pageButtonPrevNext}
      >
        <Text
          style={[
            styles.pageButtonTextPrevNext,
            currentPage === 1 && styles.disabledButton,
          ]}
        >
          {"<"}
        </Text>
      </Pressable>

      {/*Puntos antes del primer numero si hay paginas previas*/}
      {pagesToShow[0] > 1 && <Text style={styles.dots}>...</Text>}

      {/* Números + puntos */}
      <View style={styles.pageNumbers}>
        {pagesToShow.map((page, index) => {
          const prev = pagesToShow[index - 1];
          const showDots = prev && page - prev > 1;

          return (
            <React.Fragment key={page}>
              {showDots && <Text style={styles.dots}>...</Text>}
              <Pressable
                onPress={() => onPageChange(page)}
                style={[
                  styles.pageNumber,
                  currentPage === page && styles.activePageNumber,
                ]}
              >
                <Text
                  style={[
                    styles.pageNumberText,
                    currentPage === page && styles.activePageText,
                  ]}
                >
                  {page}
                </Text>
              </Pressable>
            </React.Fragment>
          );
        })}
      </View>

      {/* Flecha siguiente */}
      <Pressable
        onPress={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        style={styles.pageButtonPrevNext}
      >
        <Text
          style={[
            styles.pageButtonTextPrevNext,
            currentPage === totalPages && styles.disabledButton,
          ]}
        >
          {">"}
        </Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  paginationContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    flexWrap: "wrap",
  },
  pageNumbers: {
    flexDirection: "row",
    justifyContent: "center",
  },
  pageNumber: {
    backgroundColor: "#003e47",
    borderWidth: 1,
    borderColor: "#003e47",
    borderRadius: 6,
    paddingHorizontal: 8,
    paddingVertical: 4,
    marginHorizontal: 3,
  },
  activePageNumber: {
    backgroundColor: "#fff",
  },
  pageNumberText: {
    color: "#fff",
    fontWeight: "500",
  },
  activePageText: {
    color: "#003e47",
    fontWeight: "bold",
  },
  pageButtonPrevNext: {
    paddingHorizontal: 5,
    paddingVertical: 6,
    borderRadius: 8,
    marginHorizontal: 5,
  },
  pageButtonTextPrevNext: {
    color: "#c9e1e5ff",
    fontSize: 16,
    fontWeight: "bold",
  },
  disabledButton: {
    color: "grey",
  },
  dots: {
    color: "#fff",
    fontSize: 16,
    marginHorizontal: 4,
  },
});

export default Pagination;
